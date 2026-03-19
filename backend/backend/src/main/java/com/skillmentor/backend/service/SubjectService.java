package com.skillmentor.backend.service;

import com.skillmentor.backend.dto.request.SubjectRequestDto;
import com.skillmentor.backend.dto.SubjectResponseDto;

import java.util.List;

public interface SubjectService {

    SubjectResponseDto createSubject(SubjectRequestDto subjectRequestDto);

    List<SubjectResponseDto> getAllSubjects();

    SubjectResponseDto getSubjectById(Long id);

    SubjectResponseDto updateSubject(Long id, SubjectRequestDto subjectRequestDto);

    void deleteSubject(Long id);
}