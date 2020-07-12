package com.student.demo.service;

import com.student.demo.exeptions.ApiEmailExeption;
import com.student.demo.exeptions.ApiRequstExeption;
import com.student.demo.service.component.EmailValidator;
import com.student.demo.student.Student;
import com.student.demo.student.StudentCourse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class StudentServiceImp implements StudentService{

    private final StudentDataAccessService dataAccessService;
    private final EmailValidator emailValidator;

    @Autowired
    public StudentServiceImp(StudentDataAccessService dataAccessService,
                             EmailValidator emailValidationService) {
        this.dataAccessService = dataAccessService;
        this.emailValidator = emailValidationService;
    }

    @Override
    public List<Student> getAllStudent() {
       return Optional.ofNullable(dataAccessService.selectAllStudents())
               .orElseThrow(() -> new ApiRequstExeption("Opps something wrong"));
    }

    @Override
    public void addNewStudent(Student student) {

        UUID newStudnetId = Optional.ofNullable(student.getStudentId()).orElse(UUID.randomUUID());
        if (!emailValidator.test(student.getEmail())) {
            throw new ApiEmailExeption(student.getEmail() + " is not valid");
        }
        if (dataAccessService.isEmailTaken(student.getEmail())) {
            throw new ApiEmailExeption(student.getEmail() + " is taken");
        }
        dataAccessService.insertNewStudent(newStudnetId, student);
    }

    @Override
    public List<StudentCourse> getAllStudentCourse(UUID studentId) {
        List<StudentCourse> studentCourses = dataAccessService.selectAllStudentCourse().stream()
                .filter(student -> student.getStudentId().equals(studentId))
                .collect(Collectors.toList());
        if (studentCourses.isEmpty()) {
            throw new ApiEmailExeption("Student doesn't have course");
        }
        return studentCourses;
    }
}
