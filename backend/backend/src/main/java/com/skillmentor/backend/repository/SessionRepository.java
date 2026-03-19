package com.skillmentor.backend.repository;

import com.skillmentor.backend.entity.Session;
import com.skillmentor.backend.enums.PaymentStatus;
import com.skillmentor.backend.enums.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    List<Session> findByMentorId(Long mentorId);

    List<Session> findByStudentName(String studentName);

    boolean existsByMentorIdAndSessionDateTime(Long mentorId, LocalDateTime sessionDateTime);

    List<Session> findBySessionStatus(SessionStatus sessionStatus);

    List<Session> findByPaymentStatus(PaymentStatus paymentStatus);
}