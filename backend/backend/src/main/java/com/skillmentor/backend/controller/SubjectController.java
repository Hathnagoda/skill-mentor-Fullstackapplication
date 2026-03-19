package com.skillmentor.backend.controller;

import com.skillmentor.backend.dto.request.SubjectRequestDto;
import com.skillmentor.backend.dto.SubjectResponseDto;
import com.skillmentor.backend.service.SubjectService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/subjects")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @PostMapping
    public SubjectResponseDto createSubject(@Valid @RequestBody SubjectRequestDto subjectRequestDto) {
        return subjectService.createSubject(subjectRequestDto);
    }

    @GetMapping
    public List<SubjectResponseDto> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/{id}")
    public SubjectResponseDto getSubjectById(@PathVariable Long id) {
        return subjectService.getSubjectById(id);
    }

    @PutMapping("/{id}")
    public SubjectResponseDto updateSubject(@PathVariable Long id,
                                            @Valid @RequestBody SubjectRequestDto subjectRequestDto) {
        return subjectService.updateSubject(id, subjectRequestDto);
    }

    @DeleteMapping("/{id}")
    public String deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return "Subject deleted successfully";
    }
}