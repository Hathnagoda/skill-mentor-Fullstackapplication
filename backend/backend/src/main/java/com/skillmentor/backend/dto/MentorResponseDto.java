package com.skillmentor.backend.dto;

public class MentorResponseDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String title;

    private String profession;

    private String company;

    private Integer experienceYears;

    private String bio;

    private String profileImageUrl;

    private Boolean isCertified;

    private Integer startYear;

    public MentorResponseDto() {
    }

    public MentorResponseDto(Long id, String firstName, String lastName, String email,
                             String phoneNumber, String title, String profession,
                             String company, Integer experienceYears, String bio,
                             String profileImageUrl, Boolean isCertified, Integer startYear) {
        this.id = id;
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

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public Boolean getIsCertified() {
        return isCertified;
    }

    public void setIsCertified(Boolean certified) {
        isCertified = certified;
    }

    public Integer getStartYear() {
        return startYear;
    }

    public void setStartYear(Integer startYear) {
        this.startYear = startYear;
    }
}