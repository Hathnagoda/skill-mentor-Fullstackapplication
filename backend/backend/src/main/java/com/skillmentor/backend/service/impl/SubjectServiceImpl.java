package com.skillmentor.backend.service.impl;

import com.skillmentor.backend.dto.request.SubjectRequestDto;
import com.skillmentor.backend.dto.SubjectResponseDto;
import com.skillmentor.backend.entity.Mentor;
import com.skillmentor.backend.entity.Subject;
import com.skillmentor.backend.exception.ResourceNotFoundException;
import com.skillmentor.backend.repository.MentorRepository;
import com.skillmentor.backend.repository.SubjectRepository;
import com.skillmentor.backend.service.SubjectService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepository subjectRepository;
    private final MentorRepository mentorRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository, MentorRepository mentorRepository) {
        this.subjectRepository = subjectRepository;
        this.mentorRepository = mentorRepository;
    }

    @Override
    public SubjectResponseDto createSubject(SubjectRequestDto subjectRequestDto) {
        Mentor mentor = mentorRepository.findById(subjectRequestDto.getMentorId())
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found with id " + subjectRequestDto.getMentorId()));

        Subject subject = new Subject();
        subject.setName(subjectRequestDto.getName());
        subject.setDescription(subjectRequestDto.getDescription());
        subject.setMentor(mentor);

        Subject savedSubject = subjectRepository.save(subject);
        return mapToResponseDto(savedSubject);
    }

    @Override
    public List<SubjectResponseDto> getAllSubjects() {
        return subjectRepository.findAll()
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public SubjectResponseDto getSubjectById(Long id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id " + id));

        return mapToResponseDto(subject);
    }

    @Override
    public SubjectResponseDto updateSubject(Long id, SubjectRequestDto subjectRequestDto) {
        Subject existingSubject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id " + id));

        Mentor mentor = mentorRepository.findById(subjectRequestDto.getMentorId())
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found with id " + subjectRequestDto.getMentorId()));

        existingSubject.setName(subjectRequestDto.getName());
        existingSubject.setDescription(subjectRequestDto.getDescription());
        existingSubject.setMentor(mentor);

        Subject updatedSubject = subjectRepository.save(existingSubject);
        return mapToResponseDto(updatedSubject);
    }

    @Override
    public void deleteSubject(Long id) {
        Subject existingSubject = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found with id " + id));

        subjectRepository.delete(existingSubject);
    }

    private SubjectResponseDto mapToResponseDto(Subject subject) {
        return new SubjectResponseDto(
                subject.getId(),
                subject.getName(),
                subject.getDescription()
        );
    }
}