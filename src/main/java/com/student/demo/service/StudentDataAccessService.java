package com.student.demo.service;

import com.student.demo.student.Student;
import com.student.demo.student.StudentCourse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public class StudentDataAccessService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<Student> selectAllStudents() {
        String sql = "" +
                "SELECT student_id, " +
                "first_name, " +
                "last_name, " +
                "email, " +
                "gender " +
                "FROM student";
        return jdbcTemplate.query(sql, mapStudentFromDb());
    }

    List<StudentCourse> selectAllStudentCourse() {
        String sql = "" +
                "SELECT * " +
                "FROM student " +
                "JOIN student_course USING(student_id) " +
                "JOIN course USING(course_id)";
        return jdbcTemplate.query(sql, getStudentCourseRowMapper());
    }

    @SuppressWarnings("ConstantConditions")
    boolean isEmailTaken(String email) {
        String sql = "" +
                "SELECT EXISTS (" +
                "SELECT 1 " +
                "FROM student " +
                "WHERE email = ?" +
                ")";

        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{email},
                (resultSet, i) -> resultSet.getBoolean(1));

    }
    int insertNewStudent(UUID studnetId, Student student) {
        String sql = "" +
                "INSERT INTO student (student_id, first_name, last_name, email, gender) " +
                "VALUES (?,?,?,?,?::gender)";
        return jdbcTemplate.update(
                sql,
                studnetId,
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getGender().name().toUpperCase()
        );
    }
    private RowMapper<Student> mapStudentFromDb() {
        return (resultSet, i) -> {
            String studentIdStr = resultSet.getString("student_id");

            UUID studentId = UUID.fromString(studentIdStr);
            String fisrtName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String email = resultSet.getString("email");
            String genderStr = resultSet.getString("gender").toUpperCase();
            Student.Gender gender = Student.Gender.valueOf(genderStr);
            return new Student(studentId, fisrtName, lastName, email, gender);
        };
    }

    private RowMapper<StudentCourse> getStudentCourseRowMapper() {
        return (resultSet, i) -> {
            String studentIdStr = resultSet.getString("student_id");
            UUID studentId = UUID.fromString(studentIdStr);
            String courseIdStr = resultSet.getString("course_id");
            UUID courseId = UUID.fromString(courseIdStr);
            String name = resultSet.getString("name");
            String description = resultSet.getString("description");
            String department = resultSet.getString("department");
            String teacherName = resultSet.getString("teacher_name");
            LocalDate startDate = resultSet.getDate("start_date").toLocalDate();
            LocalDate endDate = resultSet.getDate("end_date").toLocalDate();
            Integer grade = resultSet.getInt("grade");

            return new StudentCourse(
                    studentId,
                    courseId,
                    name,
                    description,
                    department,
                    teacherName,
                    startDate,
                    endDate,
                    grade);
        };
    }

}
