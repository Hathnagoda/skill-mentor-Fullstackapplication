package com.skillmentor.backend.dto;

import com.skillmentor.backend.enums.SessionStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateSessionStatusRequestDto {

    @NotNull(message = "Session status is required")
    private SessionStatus sessionStatus;

    public UpdateSessionStatusRequestDto() {
    }

    public SessionStatus getSessionStatus() {
        return sessionStatus;
    }

    public void setSessionStatus(SessionStatus sessionStatus) {
        this.sessionStatus = sessionStatus;
    }
}