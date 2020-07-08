package com.student.demo.student;

import com.student.demo.exeptions.ApiEmailExeption;
import com.student.demo.exeptions.ApiRequstExeption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentDataAccessService dataAccessService;
    private final EmailValidator emailValidator;

    @Autowired
    public StudentService(StudentDataAccessService dataAccessService,
                          EmailValidator emailValidationService) {
        this.dataAccessService = dataAccessService;
        this.emailValidator = emailValidationService;
    }

    List<Student> getAllStudent() {
       return Optional.ofNullable(dataAccessService.selectAllStudents())
               .orElseThrow(() -> new ApiRequstExeption("Opps something wrong"));
    }

    void addNewStudent(Student student) {
        addNewStudent(null, student);
    }

    private void addNewStudent(UUID studentId, Student student) {
        UUID newStudnetId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());
        if (!emailValidator.test(student.getEmail())) {
            throw new ApiEmailExeption(student.getEmail() + " is not valid");
        }
       // emailValidator.emailValidation(student.getEmail());
        dataAccessService.insertNewStudent(newStudnetId, student);
    }
}
