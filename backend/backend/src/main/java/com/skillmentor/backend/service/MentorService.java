package com.skillmentor.backend.service;

import com.skillmentor.backend.dto.MentorRequestDto;
import com.skillmentor.backend.dto.MentorResponseDto;
import com.skillmentor.backend.dto.SubjectResponseDto;

import java.util.List;

public interface MentorService {

    MentorResponseDto createMentor(MentorRequestDto mentorRequestDto);

    List<MentorResponseDto> getAllMentors();

    MentorResponseDto getMentorById(Long id);

    MentorResponseDto updateMentor(Long id, MentorRequestDto mentorRequestDto);

    void deleteMentor(Long id);

    List<SubjectResponseDto> getSubjectsByMentorId(Long mentorId);
}