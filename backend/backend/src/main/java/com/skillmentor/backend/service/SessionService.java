package com.skillmentor.backend.service;

import com.skillmentor.backend.dto.SessionRequestDto;
import com.skillmentor.backend.dto.SessionResponseDto;
import com.skillmentor.backend.enums.PaymentStatus;
import com.skillmentor.backend.enums.SessionStatus;

import java.util.List;

public interface SessionService {

    SessionResponseDto createSession(SessionRequestDto sessionRequestDto);

    List<SessionResponseDto> getAllSessions();

    SessionResponseDto getSessionById(Long id);

    void deleteSession(Long id);

    List<SessionResponseDto> getSessionsByMentorId(Long mentorId);

    List<SessionResponseDto> getSessionsByStudentName(String studentName);

    SessionResponseDto updateSessionStatus(Long id, SessionStatus sessionStatus);

    SessionResponseDto updatePaymentStatus(Long id, PaymentStatus paymentStatus);

    SessionResponseDto updateMeetingLink(Long id, String meetingLink);

    List<SessionResponseDto> getSessionsByStatus(SessionStatus sessionStatus);

    List<SessionResponseDto> getSessionsByPaymentStatus(PaymentStatus paymentStatus);
}