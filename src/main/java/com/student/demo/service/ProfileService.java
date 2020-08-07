package com.student.demo.service;

import com.student.demo.student.Profile;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ProfileService {

    List<Profile> getUsers();

    void uploaProfileImage(UUID userProfileId, MultipartFile file);

    byte[] downloadUserProfileImage(UUID userProfileId);
}
