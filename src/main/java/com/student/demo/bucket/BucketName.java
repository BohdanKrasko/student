package com.student.demo.bucket;

public enum BucketName {
    PROFILE_IMAGE("studenet-upload-files");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}