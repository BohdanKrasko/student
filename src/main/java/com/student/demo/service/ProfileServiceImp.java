package com.student.demo.service;

import com.student.demo.bucket.BucketName;
import com.student.demo.filestore.FileStore;
import com.student.demo.service.dataaccess.ProfileDataAccessService;
import com.student.demo.student.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProfileServiceImp implements ProfileService {

    private final ProfileDataAccessService dataAccessService;
    private final FileStore fileStore;

    @Autowired
    public ProfileServiceImp(ProfileDataAccessService dataAccessService, FileStore fileStore) {
        this.dataAccessService = dataAccessService;
        this.fileStore = fileStore;
    }

    @Override
    public List<Profile> getUsers() {
        return dataAccessService.getAllUsers();
    }

    @Override
    public void uploaProfileImage(UUID userProfileId, MultipartFile file) {
        // 1. Check if image is not empty
        isNotEmpty(file);
        // 2. If file is an image
        isImage(file);
        // 3. The user exists in our database
        isUserExists(userProfileId);
        // 4. Grab some metadata from file if any
        Map<String, String> metadata = optionalMetadata(file);
        // 5. Store the image is s3 and upload database (imageLink) with s3 image link
        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), userProfileId);
        String fileName = String.format("%s-%s", UUID.randomUUID(), file.getOriginalFilename());
        try {
            fileStore.save(path, fileName, Optional.of(metadata), file.getInputStream());
            dataAccessService.updateImageLink(userProfileId, fileName);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }

    }

    @Override
    public byte[] downloadUserProfileImage(UUID userProfileId) {
        isUserExists(userProfileId);
        String imageLink = dataAccessService.selectImageLink(userProfileId);
        String path = String.format("%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                userProfileId);
        return fileStore.download(path, imageLink);

    }

    private Map<String, String> optionalMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }

    private void isUserExists(UUID userProfileId) {
        if (!dataAccessService.isProfileExists(userProfileId)) {
            throw new IllegalStateException("User " + userProfileId + " does not exist");
        }
    }

    private void isNotEmpty(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Please choose image");
        }
    }

    private void isImage(MultipartFile file) {
        List<String> imageTypes = new ArrayList<>();
        imageTypes.add(MediaType.IMAGE_JPEG_VALUE);
        imageTypes.add(MediaType.IMAGE_PNG_VALUE);
        imageTypes.add(MediaType.IMAGE_GIF_VALUE);

        if (!imageTypes.contains(file.getContentType())) {
            throw new IllegalStateException("File must be an image [" + file.getContentType() + "]");
        }
    }
}
