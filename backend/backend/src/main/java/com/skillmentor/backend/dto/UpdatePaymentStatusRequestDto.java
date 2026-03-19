package com.skillmentor.backend.dto;

import com.skillmentor.backend.enums.PaymentStatus;
import jakarta.validation.constraints.NotNull;

public class UpdatePaymentStatusRequestDto {

    @NotNull(message = "Payment status is required")
    private PaymentStatus paymentStatus;

    public UpdatePaymentStatusRequestDto() {
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}