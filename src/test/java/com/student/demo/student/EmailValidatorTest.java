package com.student.demo.student;

import com.student.demo.service.component.EmailValidator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;


class EmailValidatorTest {
    private final EmailValidator underTest = new EmailValidator();

    @Test
    void itShouldValidateEmail() {
        assertThat(underTest.test("example@gmail.com")).isTrue();
    }
    @Test
    void itShouldValidateAnIncorrectEmail() {
        assertThat(underTest.test("example@gmailcom")).isFalse();
    }
}