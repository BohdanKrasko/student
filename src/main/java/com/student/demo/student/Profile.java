package com.student.demo.student;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

public class Profile {

    private UUID profileId;
    private String username;
    private  String imageLink; // S3 key

    public Profile(UUID profileId, String username, String imageLink) {
        this.profileId = profileId;
        this.username = username;
        this.imageLink = imageLink;
    }


    public UUID getProfileId() {
        return profileId;
    }

    public void setProfileId(UUID profileId) {
        this.profileId = profileId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Optional<String> getImageLink() {
        return Optional.ofNullable(imageLink);
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Profile profile = (Profile) o;
        return Objects.equals(profileId, profile.profileId) &&
                Objects.equals(username, profile.username) &&
                Objects.equals(imageLink, profile.imageLink);
    }

    @Override
    public int hashCode() {
        return Objects.hash(profileId, username, imageLink);
    }

}
