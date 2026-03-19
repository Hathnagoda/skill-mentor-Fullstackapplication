package com.skillmentor.backend.controller;

import com.skillmentor.backend.dto.MentorRequestDto;
import com.skillmentor.backend.dto.MentorResponseDto;
import com.skillmentor.backend.dto.SubjectResponseDto;
import com.skillmentor.backend.service.MentorService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mentors")
public class MentorController {

    private final MentorService mentorService;

    public MentorController(MentorService mentorService) {
        this.mentorService = mentorService;
    }

    @PostMapping
    public MentorResponseDto createMentor(@Valid @RequestBody MentorRequestDto mentorRequestDto) {
        return mentorService.createMentor(mentorRequestDto);
    }

    @GetMapping
    public List<MentorResponseDto> getAllMentors() {
        return mentorService.getAllMentors();
    }

    @GetMapping("/{id}")
    public MentorResponseDto getMentorById(@PathVariable Long id) {
        return mentorService.getMentorById(id);
    }

    @PutMapping("/{id}")
    public MentorResponseDto updateMentor(@PathVariable Long id,
                                          @Valid @RequestBody MentorRequestDto mentorRequestDto) {
        return mentorService.updateMentor(id, mentorRequestDto);
    }

    @DeleteMapping("/{id}")
    public String deleteMentor(@PathVariable Long id) {
        mentorService.deleteMentor(id);
        return "Mentor deleted successfully";
    }

    @GetMapping("/{mentorId}/subjects")
    public List<SubjectResponseDto> getSubjectsByMentorId(@PathVariable Long mentorId) {
        return mentorService.getSubjectsByMentorId(mentorId);
    }
}