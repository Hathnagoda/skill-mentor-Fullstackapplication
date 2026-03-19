package com.skillmentor.backend.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class SessionRequestDto {

    @NotBlank(message = "Student name is required")
    private String studentName;

    @NotNull(message = "Session date and time is required")
    @Future(message = "Session date and time must be in the future")
    private LocalDateTime sessionDateTime;

    @NotNull(message = "Duration is required")
    @Min(value = 15, message = "Duration must be at least 15 minutes")
    private Integer durationMinutes;

    @NotNull(message = "Mentor ID is required")
    private Long mentorId;

    @NotNull(message = "Subject ID is required")
    private Long subjectId;

    private String paymentSlipUrl;

    public SessionRequestDto() {
    }

    public String getStudentName() {
        return studentName;
    }

    public LocalDateTime getSessionDateTime() {
        return sessionDateTime;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public String getPaymentSlipUrl() {
        return paymentSlipUrl;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public void setSessionDateTime(LocalDateTime sessionDateTime) {
        this.sessionDateTime = sessionDateTime;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public void setPaymentSlipUrl(String paymentSlipUrl) {
        this.paymentSlipUrl = paymentSlipUrl;
    }
}