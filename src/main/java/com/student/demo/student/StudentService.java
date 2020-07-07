package com.student.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentDataAccessService dataAccessService;

    @Autowired
    public StudentService(StudentDataAccessService dataAccessService) {
        this.dataAccessService = dataAccessService;
    }

    List<Student> getAllStudent() {
       return dataAccessService.selectAlllStudents();
    }
    void addNewStudent(Student student) {
        addNewStudent(null, student);
    }
    void addNewStudent(UUID studentId, Student student) {
        UUID newStudnetId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());
        dataAccessService.insertNewStudent(newStudnetId, student);
    }
}
