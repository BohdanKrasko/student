package com.student.demo.student;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

public class Profile {

    private final UUID profileId;
    private final String username;
    private final String imageLink; // S3 key

    public Profile(UUID profileId, String username, String imageLink) {
        this.profileId = profileId;
        this.username = username;
        this.imageLink = imageLink;
    }


    public UUID getProfileId() {
        return profileId;
    }

    public String getUsername() {
        return username;
    }

    public Optional<String> getImageLink() {
        return Optional.ofNullable(imageLink);
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
