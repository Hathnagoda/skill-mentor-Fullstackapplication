package com.skillmentor.backend.dto;

import com.skillmentor.backend.enums.PaymentStatus;
import com.skillmentor.backend.enums.SessionStatus;

import java.time.LocalDateTime;

public class SessionResponseDto {

    private Long id;
    private String studentName;
    private LocalDateTime sessionDateTime;
    private Integer durationMinutes;
    private String meetingLink;
    private String paymentSlipUrl;
    private SessionStatus sessionStatus;
    private PaymentStatus paymentStatus;
    private Long mentorId;
    private String mentorName;
    private Long subjectId;
    private String subjectName;

    public SessionResponseDto() {
    }

    public SessionResponseDto(Long id, String studentName, LocalDateTime sessionDateTime,
                              Integer durationMinutes, String meetingLink, String paymentSlipUrl,
                              SessionStatus sessionStatus, PaymentStatus paymentStatus,
                              Long mentorId, String mentorName,
                              Long subjectId, String subjectName) {
        this.id = id;
        this.studentName = studentName;
        this.sessionDateTime = sessionDateTime;
        this.durationMinutes = durationMinutes;
        this.meetingLink = meetingLink;
        this.paymentSlipUrl = paymentSlipUrl;
        this.sessionStatus = sessionStatus;
        this.paymentStatus = paymentStatus;
        this.mentorId = mentorId;
        this.mentorName = mentorName;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
    }

    public Long getId() {
        return id;
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

    public String getMeetingLink() {
        return meetingLink;
    }

    public String getPaymentSlipUrl() {
        return paymentSlipUrl;
    }

    public SessionStatus getSessionStatus() {
        return sessionStatus;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public String getMentorName() {
        return mentorName;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }

    public void setPaymentSlipUrl(String paymentSlipUrl) {
        this.paymentSlipUrl = paymentSlipUrl;
    }

    public void setSessionStatus(SessionStatus sessionStatus) {
        this.sessionStatus = sessionStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }

    public void setMentorName(String mentorName) {
        this.mentorName = mentorName;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }
}