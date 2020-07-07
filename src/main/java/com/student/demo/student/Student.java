package com.student.demo.student;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class Student {

    private final @JsonProperty("studentId") UUID studentId;
    private final @JsonProperty("firstName") String firstName;
    private final @JsonProperty("lastName") String lastName;
    private final @JsonProperty("email") String email;
    private final @JsonProperty("gender") Gender gender;

    public Student(UUID studentId,
                   String firstName,
                   String lastName,
                   String email,
                   Gender gender) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public Gender getGender() {
        return gender;
    }

    @Override
    public String toString() {
        return "Student{" +
                "studentId=" + studentId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", gender=" + gender +
                '}';
    }

    enum Gender{
        MALE, FEMALE
    }
}
