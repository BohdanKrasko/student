package com.student.demo.service;

import com.student.demo.service.dataaccess.ProfileDataAccessService;
import com.student.demo.student.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
