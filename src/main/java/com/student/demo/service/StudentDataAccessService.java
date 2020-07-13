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
import java.util.Optional;
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

    List<StudentCourse> selectAllStudentCourse(UUID studentId) {
        String sql = "" +
                "SELECT * " +
                "FROM student " +
                "JOIN student_course USING(student_id) " +
                "JOIN course USING(course_id) " +
                "WHERE student.student_id = ?";
        return jdbcTemplate.query(
                sql,
                new Object[] {studentId},
                getStudentCourseRowMapper());
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
        return (resultSet, i) ->
                new Student(
                    UUID.fromString(resultSet.getString("student_id")),
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getString("email"),
                    Student.Gender.valueOf(resultSet.getString("gender").toUpperCase()));
    }

    private RowMapper<StudentCourse> getStudentCourseRowMapper() {
        return (resultSet, i) ->
                new StudentCourse(
                    UUID.fromString(resultSet.getString("student_id")),
                    UUID.fromString(resultSet.getString("course_id")),
                    resultSet.getString("name"),
                    resultSet.getString("description"),
                    resultSet.getString("department"),
                    resultSet.getString("teacher_name"),
                    resultSet.getDate("start_date").toLocalDate(),
                    resultSet.getDate("end_date").toLocalDate(),
                        Optional.ofNullable(resultSet.getString("grade"))
                                .map(Integer::parseInt)
                                .orElse(null));
    }
}
