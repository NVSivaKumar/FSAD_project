package com.careerguidance.dto;

import com.careerguidance.model.User;

public class AuthResponse {
    private String message;
    private String token;
    private UserResponse user;
    
    public AuthResponse() {}

    public AuthResponse(String message, String token, UserResponse user) {
        this.message = message;
        this.token = token;
        this.user = user;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public UserResponse getUser() { return user; }
    public void setUser(UserResponse user) { this.user = user; }

    public static class UserResponse {
        private Long id;
        private String fullName;
        private String email;
        private String role;
        
        public UserResponse() {}
        
        public UserResponse(Long id, String fullName, String email, String role) {
            this.id = id;
            this.fullName = fullName;
            this.email = email;
            this.role = role;
        }

        public static UserResponse fromUser(User user) {
            return new UserResponse(user.getId(), user.getFullName(), user.getEmail(), user.getRole());
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }
}
