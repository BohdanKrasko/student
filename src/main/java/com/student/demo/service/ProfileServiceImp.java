package com.student.demo.service;

import com.student.demo.service.dataaccess.ProfileDataAccessService;
import com.student.demo.student.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
public class ProfileServiceImp implements ProfileService {

    private final ProfileDataAccessService dataAccessService;

    @Autowired
    public ProfileServiceImp(ProfileDataAccessService dataAccessService) {
        this.dataAccessService = dataAccessService;
    }

    @Override
    public List<Profile> getUsers() {
        return dataAccessService.getAllUsers();
    }

    @Override
    public void uploaProfileImage(UUID userProfileId, MultipartFile file) {
        // 1. Check if image is not empty
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Please choose image");
        }
        // 2. If file is an image
        System.out.println(file.getContentType());

        // 3. The user exists in our database
        // 4. Grab some metadata from file if any
        // 5. Store the image is s3 and upload database (imageLink) with s3 image link
    }
}
