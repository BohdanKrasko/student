package com.student.demo.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

import static com.student.demo.student.Student.Gender.FEMELE;
import static com.student.demo.student.Student.Gender.MALE;

@RestController
@RequestMapping("students")
public class StudentController {
    public List<Student> getAllStudents = List.of(
            new Student(UUID.randomUUID(), "Tom", "Cat", "tom@cat.com", MALE),
            new Student(UUID.randomUUID(), "Anna", "Jey", "anna@jey.com", FEMELE)
    );
    @GetMapping // ("get")
    public List<Student> getGetAllStudents() {
        return getAllStudents;
    }
}
