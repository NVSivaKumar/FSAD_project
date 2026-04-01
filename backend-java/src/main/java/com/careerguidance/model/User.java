package com.careerguidance.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String password;

    @Column(nullable = false, length = 50)
    private String role; // Student, Counselor, Admin

    @Column(columnDefinition = "TEXT")
    private String studentIdFilePath;

    @Column(columnDefinition = "TEXT")
    private String degree;

    @Column(columnDefinition = "TEXT")
    private String resumeFilePath;

    @Column(name = "verification_status", length = 50)
    private String verificationStatus = "APPROVED"; // PENDING, APPROVED, REJECTED

    @Column(updatable = false)
    private Date createdAt;

    public User() {}

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getStudentIdFilePath() { return studentIdFilePath; }
    public void setStudentIdFilePath(String studentIdFilePath) { this.studentIdFilePath = studentIdFilePath; }
    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }
    public String getResumeFilePath() { return resumeFilePath; }
    public void setResumeFilePath(String resumeFilePath) { this.resumeFilePath = resumeFilePath; }
    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}
