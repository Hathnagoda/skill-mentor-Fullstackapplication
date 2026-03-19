package com.skillmentor.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "mentors")
public class Mentor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String title;

    private String profession;

    private String company;

    private Integer experienceYears;

    @Column(length = 1000)
    private String bio;

    private String profileImageUrl;

    private Boolean isCertified;

    private Integer startYear;

    @OneToMany(mappedBy = "mentor")
    @JsonIgnore
    private List<Subject> subjects;

    public Mentor() {
    }

    public Mentor(String firstName, String lastName, String email, String phoneNumber,
                  String title, String profession, String company, Integer experienceYears,
                  String bio, String profileImageUrl, Boolean isCertified, Integer startYear) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.title = title;
        this.profession = profession;
        this.company = company;
        this.experienceYears = experienceYears;
        this.bio = bio;
        this.profileImageUrl = profileImageUrl;
        this.isCertified = isCertified;
        this.startYear = startYear;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getTitle() {
        return title;
    }

    public String getProfession() {
        return profession;
    }

    public String getCompany() {
        return company;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public String getBio() {
        return bio;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public Boolean getIsCertified() {
        return isCertified;
    }

    public Integer getStartYear() {
        return startYear;
    }

    public List<Subject> getSubjects() {
        return subjects;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public void setIsCertified(Boolean certified) {
        isCertified = certified;
    }

    public void setStartYear(Integer startYear) {
        this.startYear = startYear;
    }

    public void setSubjects(List<Subject> subjects) {
        this.subjects = subjects;
    }
}