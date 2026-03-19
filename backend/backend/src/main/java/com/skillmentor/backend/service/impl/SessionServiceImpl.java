package com.skillmentor.backend.service.impl;

import com.skillmentor.backend.dto.SessionRequestDto;
import com.skillmentor.backend.dto.SessionResponseDto;
import com.skillmentor.backend.entity.Mentor;
import com.skillmentor.backend.entity.Session;
import com.skillmentor.backend.entity.Subject;
import com.skillmentor.backend.enums.PaymentStatus;
import com.skillmentor.backend.enums.SessionStatus;
import com.skillmentor.backend.exception.BadRequestException;
import com.skillmentor.backend.exception.ResourceNotFoundException;
import com.skillmentor.backend.repository.MentorRepository;
import com.skillmentor.backend.repository.SessionRepository;
import com.skillmentor.backend.repository.SubjectRepository;
import com.skillmentor.backend.service.SessionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SessionServiceImpl implements SessionService {

    private final SessionRepository sessionRepository;
    private final MentorRepository mentorRepository;
    private final SubjectRepository subjectRepository;

    public SessionServiceImpl(SessionRepository sessionRepository,
                              MentorRepository mentorRepository,
                              SubjectRepository subjectRepository) {
        this.sessionRepository = sessionRepository;
        this.mentorRepository = mentorRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public SessionResponseDto createSession(SessionRequestDto sessionRequestDto) {
        Mentor mentor = mentorRepository.findById(sessionRequestDto.getMentorId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Mentor not found with id " + sessionRequestDto.getMentorId()));

        Subject subject = subjectRepository.findById(sessionRequestDto.getSubjectId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Subject not found with id " + sessionRequestDto.getSubjectId()));

        if (subject.getMentor() == null || !subject.getMentor().getId().equals(mentor.getId())) {
            throw new BadRequestException("Selected subject does not belong to the selected mentor");
        }

        boolean mentorAlreadyBooked = sessionRepository.existsByMentorIdAndSessionDateTime(
                mentor.getId(),
                sessionRequestDto.getSessionDateTime()
        );

        if (mentorAlreadyBooked) {
            throw new BadRequestException("Mentor already has a session at the selected date and time");
        }

        Session session = new Session();
        session.setStudentName(sessionRequestDto.getStudentName());
        session.setSessionDateTime(sessionRequestDto.getSessionDateTime());
        session.setDurationMinutes(sessionRequestDto.getDurationMinutes());
        session.setMeetingLink(null);
        session.setPaymentSlipUrl(sessionRequestDto.getPaymentSlipUrl());
        session.setSessionStatus(SessionStatus.PENDING);
        session.setPaymentStatus(PaymentStatus.PENDING);
        session.setMentor(mentor);
        session.setSubject(subject);

        Session savedSession = sessionRepository.save(session);
        return mapToResponseDto(savedSession);
    }

    @Override
    public List<SessionResponseDto> getAllSessions() {
        return sessionRepository.findAll()
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public SessionResponseDto getSessionById(Long id) {
        Session session = sessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with id " + id));

        return mapToResponseDto(session);
    }

    @Override
    public void deleteSession(Long id) {
        Session session = sessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with id " + id));

        sessionRepository.delete(session);
    }

    @Override
    public List<SessionResponseDto> getSessionsByMentorId(Long mentorId) {
        mentorRepository.findById(mentorId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found with id " + mentorId));

        return sessionRepository.findByMentorId(mentorId)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SessionResponseDto> getSessionsByStudentName(String studentName) {
        return sessionRepository.findByStudentName(studentName)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public SessionResponseDto updateSessionStatus(Long id, SessionStatus sessionStatus) {
        Session session = sessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with id " + id));

        SessionStatus currentStatus = session.getSessionStatus();

        if (currentStatus == SessionStatus.COMPLETED) {
            throw new BadRequestException("Completed sessions cannot be changed");
        }

        if (currentStatus == SessionStatus.CANCELLED) {
            throw new BadRequestException("Cancelled sessions cannot be changed");
        }

        if (sessionStatus == SessionStatus.CONFIRMED) {
            if (session.getPaymentStatus() != PaymentStatus.CONFIRMED) {
                throw new BadRequestException("Payment must be confirmed before confirming the session");
            }

            if (currentStatus != SessionStatus.PENDING) {
                throw new BadRequestException("Only pending sessions can be confirmed");
            }
        }

        if (sessionStatus == SessionStatus.COMPLETED) {
            if (currentStatus != SessionStatus.CONFIRMED) {
                throw new BadRequestException("Only confirmed sessions can be marked as completed");
            }

            if (session.getMeetingLink() == null || session.getMeetingLink().isBlank()) {
                throw new BadRequestException("Meeting link must be added before completing the session");
            }
        }

        if (sessionStatus == SessionStatus.CANCELLED) {
            if (currentStatus != SessionStatus.PENDING && currentStatus != SessionStatus.CONFIRMED) {
                throw new BadRequestException("Only pending or confirmed sessions can be cancelled");
            }
        }

        if (sessionStatus == SessionStatus.PENDING && currentStatus != SessionStatus.PENDING) {
            throw new BadRequestException("Session cannot be moved back to pending");
        }

        session.setSessionStatus(sessionStatus);
        Session updatedSession = sessionRepository.save(session);

        return mapToResponseDto(updatedSession);
    }

    @Override
    public SessionResponseDto updatePaymentStatus(Long id, PaymentStatus paymentStatus) {
        Session session = sessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with id " + id));

        if (session.getSessionStatus() == SessionStatus.COMPLETED) {
            throw new BadRequestException("Payment status cannot be changed after session completion");
        }

        session.setPaymentStatus(paymentStatus);
        Session updatedSession = sessionRepository.save(session);

        return mapToResponseDto(updatedSession);
    }

    @Override
    public SessionResponseDto updateMeetingLink(Long id, String meetingLink) {
        Session session = sessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with id " + id));

        if (session.getSessionStatus() == SessionStatus.COMPLETED ||
                session.getSessionStatus() == SessionStatus.CANCELLED) {
            throw new BadRequestException("Meeting link cannot be updated for completed or cancelled sessions");
        }

        if (meetingLink == null || meetingLink.isBlank()) {
            throw new BadRequestException("Meeting link cannot be blank");
        }

        session.setMeetingLink(meetingLink);
        Session updatedSession = sessionRepository.save(session);

        return mapToResponseDto(updatedSession);
    }

    @Override
    public List<SessionResponseDto> getSessionsByStatus(SessionStatus sessionStatus) {
        return sessionRepository.findBySessionStatus(sessionStatus)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SessionResponseDto> getSessionsByPaymentStatus(PaymentStatus paymentStatus) {
        return sessionRepository.findByPaymentStatus(paymentStatus)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    private SessionResponseDto mapToResponseDto(Session session) {
        return new SessionResponseDto(
                session.getId(),
                session.getStudentName(),
                session.getSessionDateTime(),
                session.getDurationMinutes(),
                session.getMeetingLink(),
                session.getPaymentSlipUrl(),
                session.getSessionStatus(),
                session.getPaymentStatus(),
                session.getMentor().getId(),
                session.getMentor().getFirstName() + " " + session.getMentor().getLastName(),
                session.getSubject().getId(),
                session.getSubject().getName()
        );
    }
}