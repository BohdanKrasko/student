package com.student.demo.student;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

public class Profile {

    private UUID id;
    private String username;
    private  String imageLink; // S3 key

    public Profile(UUID id, String username, String imageLink) {
        this.id = id;
        this.username = username;
        this.imageLink = imageLink;
    }


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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
        return Objects.equals(id, profile.id) &&
                Objects.equals(username, profile.username) &&
                Objects.equals(imageLink, profile.imageLink);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, imageLink);
    }

}
