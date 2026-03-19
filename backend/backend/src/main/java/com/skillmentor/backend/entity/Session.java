package com.skillmentor.backend.entity;

import com.skillmentor.backend.enums.PaymentStatus;
import com.skillmentor.backend.enums.SessionStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "sessions")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;

    private LocalDateTime sessionDateTime;

    private Integer durationMinutes;

    private String meetingLink;

    private String paymentSlipUrl;

    @Enumerated(EnumType.STRING)
    private SessionStatus sessionStatus;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private Mentor mentor;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    public Session() {
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

    public Mentor getMentor() {
        return mentor;
    }

    public Subject getSubject() {
        return subject;
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

    public void setMentor(Mentor mentor) {
        this.mentor = mentor;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
}