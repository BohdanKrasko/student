package com.student.demo.service;

import com.student.demo.student.Student;
import com.student.demo.student.StudentCourse;

import java.util.List;
import java.util.UUID;

public interface StudentService {

    List<Student> getAllStudent();

    void addNewStudent(Student student);

    List<StudentCourse> getAllStudentCourse(UUID studentId);
}
