package com.student.demo.exeptions;

import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

public class ApiExeption {

    private final HttpStatus httpStatus;
    private final String message;
    private final ZonedDateTime timestamp;
    private final String error;

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public ApiExeption(HttpStatus httpStatus,
                       String message,
                       ZonedDateTime timestamp,
                       String error) {
        this.httpStatus = httpStatus;
        this.message = message;
        this.timestamp = timestamp;
        this.error = error;
    }
}
