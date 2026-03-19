package com.skillmentor.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SubjectRequestDto {

    @NotBlank(message = "Subject name is required")
    @Size(min = 2, max = 100, message = "Subject name must be between 2 and 100 characters")
    private String name;

    private String description;

    private Long mentorId;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }
}