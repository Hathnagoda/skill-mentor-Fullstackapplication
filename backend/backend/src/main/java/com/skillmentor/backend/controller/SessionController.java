package com.skillmentor.backend.controller;

import com.skillmentor.backend.dto.SessionRequestDto;
import com.skillmentor.backend.dto.SessionResponseDto;
import com.skillmentor.backend.dto.UpdatePaymentStatusRequestDto;
import com.skillmentor.backend.dto.UpdateSessionStatusRequestDto;
import com.skillmentor.backend.service.SessionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping
    public SessionResponseDto createSession(@Valid @RequestBody SessionRequestDto sessionRequestDto) {
        return sessionService.createSession(sessionRequestDto);
    }

    @GetMapping
    public List<SessionResponseDto> getAllSessions() {
        return sessionService.getAllSessions();
    }

    @GetMapping("/{id}")
    public SessionResponseDto getSessionById(@PathVariable Long id) {
        return sessionService.getSessionById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteSession(@PathVariable Long id) {
        sessionService.deleteSession(id);
        return "Session deleted successfully";
    }

    @GetMapping("/mentor/{mentorId}")
    public List<SessionResponseDto> getSessionsByMentorId(@PathVariable Long mentorId) {
        return sessionService.getSessionsByMentorId(mentorId);
    }

    @GetMapping("/student/{studentName}")
    public List<SessionResponseDto> getSessionsByStudentName(@PathVariable String studentName) {
        return sessionService.getSessionsByStudentName(studentName);
    }

    @GetMapping("/status/{sessionStatus}")
    public List<SessionResponseDto> getSessionsByStatus(@PathVariable com.skillmentor.backend.enums.SessionStatus sessionStatus) {
        return sessionService.getSessionsByStatus(sessionStatus);
    }

    @GetMapping("/payment-status/{paymentStatus}")
    public List<SessionResponseDto> getSessionsByPaymentStatus(@PathVariable com.skillmentor.backend.enums.PaymentStatus paymentStatus) {
        return sessionService.getSessionsByPaymentStatus(paymentStatus);
    }

    @PatchMapping("/{id}/status")
    public SessionResponseDto updateSessionStatus(@PathVariable Long id,
                                                  @Valid @RequestBody UpdateSessionStatusRequestDto requestDto) {
        return sessionService.updateSessionStatus(id, requestDto.getSessionStatus());
    }

    @PatchMapping("/{id}/payment-status")
    public SessionResponseDto updatePaymentStatus(@PathVariable Long id,
                                                  @Valid @RequestBody UpdatePaymentStatusRequestDto requestDto) {
        return sessionService.updatePaymentStatus(id, requestDto.getPaymentStatus());
    }

    @PatchMapping("/{id}/meeting-link")
    public SessionResponseDto updateMeetingLink(@PathVariable Long id,
                                                @RequestParam String meetingLink) {
        return sessionService.updateMeetingLink(id, meetingLink);
    }

    @PatchMapping("/{id}/confirm-payment")
    public SessionResponseDto confirmPayment(@PathVariable Long id) {
        return sessionService.updatePaymentStatus(id, com.skillmentor.backend.enums.PaymentStatus.CONFIRMED);
    }

    @PatchMapping("/{id}/confirm-session")
    public SessionResponseDto confirmSession(@PathVariable Long id) {
        return sessionService.updateSessionStatus(id, com.skillmentor.backend.enums.SessionStatus.CONFIRMED);
    }

    @PatchMapping("/{id}/complete-session")
    public SessionResponseDto completeSession(@PathVariable Long id) {
        return sessionService.updateSessionStatus(id, com.skillmentor.backend.enums.SessionStatus.COMPLETED);
    }
    @PatchMapping("/{id}/cancel")
    public SessionResponseDto cancelSession(@PathVariable Long id) {
        return sessionService.updateSessionStatus(id, com.skillmentor.backend.enums.SessionStatus.CANCELLED);
    }
}