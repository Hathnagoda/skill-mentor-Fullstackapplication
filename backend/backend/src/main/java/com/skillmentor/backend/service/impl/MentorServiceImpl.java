package com.skillmentor.backend.service.impl;

import com.skillmentor.backend.dto.MentorRequestDto;
import com.skillmentor.backend.dto.MentorResponseDto;
import com.skillmentor.backend.dto.SubjectResponseDto;
import com.skillmentor.backend.entity.Mentor;
import com.skillmentor.backend.entity.Subject;
import com.skillmentor.backend.exception.ResourceNotFoundException;
import com.skillmentor.backend.repository.MentorRepository;
import com.skillmentor.backend.repository.SubjectRepository;
import com.skillmentor.backend.service.MentorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MentorServiceImpl implements MentorService {

    private final MentorRepository mentorRepository;
    private final SubjectRepository subjectRepository;

    public MentorServiceImpl(MentorRepository mentorRepository, SubjectRepository subjectRepository) {
        this.mentorRepository = mentorRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public MentorResponseDto createMentor(MentorRequestDto mentorRequestDto) {
        Mentor mentor = new Mentor();
        mentor.setFirstName(mentorRequestDto.getFirstName());
        mentor.setLastName(mentorRequestDto.getLastName());
        mentor.setEmail(mentorRequestDto.getEmail());
        mentor.setPhoneNumber(mentorRequestDto.getPhoneNumber());
        mentor.setTitle(mentorRequestDto.getTitle());
        mentor.setProfession(mentorRequestDto.getProfession());
        mentor.setCompany(mentorRequestDto.getCompany());
        mentor.setExperienceYears(mentorRequestDto.getExperienceYears());
        mentor.setBio(mentorRequestDto.getBio());
        mentor.setProfileImageUrl(mentorRequestDto.getProfileImageUrl());
        mentor.setIsCertified(mentorRequestDto.getIsCertified());
        mentor.setStartYear(mentorRequestDto.getStartYear());

        Mentor savedMentor = mentorRepository.save(mentor);
        return mapToResponseDto(savedMentor);
    }

    @Override
    public List<MentorResponseDto> getAllMentors() {
        return mentorRepository.findAll()
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public MentorResponseDto getMentorById(Long id) {
        Mentor mentor = mentorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found with id " + id));

        return mapToResponseDto(mentor);
    }

    @Override
    public MentorResponseDto updateMentor(Long id, MentorRequestDto mentorRequestDto) {
        Mentor existingMentor = mentorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found with id " + id));

        existingMentor.setFirstName(mentorRequestDto.getFirstName());
        existingMentor.setLastName(mentorRequestDto.getLastName());
        existingMentor.setEmail(mentorRequestDto.getEmail());
        existingMentor.setPhoneNumber(mentorRequestDto.getPhoneNumber());
        existingMentor.setTitle(mentorRequestDto.getTitle());
        existingMentor.setProfession(mentorRequestDto.getProfession());
        existingMentor.setCompany(mentorRequestDto.getCompany());
        existingMentor.setExperienceYears(mentorRequestDto.getExperienceYears());
        existingMentor.setBio(mentorRequestDto.getBio());
        existingMentor.setProfileImageUrl(mentorRequestDto.getProfileImageUrl());
        existingMentor.setIsCertified(mentorRequestDto.getIsCertified());
        existingMentor.setStartYear(mentorRequestDto.getStartYear());

        Mentor updatedMentor = mentorRepository.save(existingMentor);
        return mapToResponseDto(updatedMentor);
    }

    @Override
    public void deleteMentor(Long id) {
        Mentor existingMentor = mentorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found with id " + id));

        mentorRepository.delete(existingMentor);
    }

    @Override
    public List<SubjectResponseDto> getSubjectsByMentorId(Long mentorId) {
        mentorRepository.findById(mentorId)
                .orElseThrow(() -> new ResourceNotFoundException("Mentor not found with id " + mentorId));

        return subjectRepository.findByMentorId(mentorId)
                .stream()
                .map(this::mapSubjectToResponseDto)
                .collect(Collectors.toList());
    }

    private MentorResponseDto mapToResponseDto(Mentor mentor) {
        return new MentorResponseDto(
                mentor.getId(),
                mentor.getFirstName(),
                mentor.getLastName(),
                mentor.getEmail(),
                mentor.getPhoneNumber(),
                mentor.getTitle(),
                mentor.getProfession(),
                mentor.getCompany(),
                mentor.getExperienceYears(),
                mentor.getBio(),
                mentor.getProfileImageUrl(),
                mentor.getIsCertified(),
                mentor.getStartYear()
        );
    }

    private SubjectResponseDto mapSubjectToResponseDto(Subject subject) {
        return new SubjectResponseDto(
                subject.getId(),
                subject.getName(),
                subject.getDescription()
        );
    }
}