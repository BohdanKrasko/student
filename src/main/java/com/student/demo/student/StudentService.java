package com.student.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentDataAccessService dataAccessService;

    @Autowired
    public StudentService(StudentDataAccessService dataAccessService) {
        this.dataAccessService = dataAccessService;
    }

    public List<Student> getAllStudent() {
       return dataAccessService.selectAlllStudents();
    }
}
