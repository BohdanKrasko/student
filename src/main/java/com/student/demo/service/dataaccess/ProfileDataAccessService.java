package com.student.demo.service.dataaccess;

import com.student.demo.student.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class ProfileDataAccessService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProfileDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Profile> getAllUsers() {
        String sql = "" +
                "SELECT " +
                "profile_id, " +
                "username, " +
                "image_link " +
                "FROM profile";

        return jdbcTemplate.query(sql, getProfileRowMapper());
    }

    private RowMapper<Profile> getProfileRowMapper() {
        return (resultSet, i) -> new Profile(
                UUID.fromString(resultSet.getString("profile_id")),
                resultSet.getString("username"),
                resultSet.getString("image_link"));
    }

}
