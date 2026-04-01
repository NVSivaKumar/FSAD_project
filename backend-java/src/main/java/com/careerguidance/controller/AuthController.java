package com.careerguidance.controller;

import com.careerguidance.dto.AuthResponse;
import com.careerguidance.dto.LoginRequest;
import com.careerguidance.dto.ResetPasswordRequest;
import com.careerguidance.model.User;
import com.careerguidance.repository.UserRepository;
import com.careerguidance.security.JwtUtils;
import com.careerguidance.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    FileStorageService fileStorageService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestParam("fullName") String fullName,
                                          @RequestParam("email") String email,
                                          @RequestParam("password") String password,
                                          @RequestParam("role") String role,
                                          @RequestParam(value = "degree", required = false) String degree,
                                          @RequestParam(value = "resume", required = false) MultipartFile resume,
                                          @RequestParam(value = "studentId", required = false) MultipartFile studentId) {
        try {
            if (userRepository.findByEmail(email).isPresent()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Email already in use.");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            User user = new User();
            user.setFullName(fullName);
            user.setEmail(email);
            user.setPassword(encoder.encode(password));
            user.setRole(role);
            user.setDegree(degree);
            user.setVerificationStatus("PENDING");

            if (resume != null && !resume.isEmpty()) {
                String resumePath = fileStorageService.saveFile(resume, "resumes");
                user.setResumeFilePath(resumePath);
            }

            if (studentId != null && !studentId.isEmpty()) {
                String studentIdPath = fileStorageService.saveFile(studentId, "studentIds");
                user.setStudentIdFilePath(studentIdPath);
            }

            userRepository.save(user);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully!");
            response.put("user", AuthResponse.UserResponse.fromUser(user));
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Server error during registration.");
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
            if (userOpt.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Invalid credentials. User not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            User user = userOpt.get();

            if (user.getVerificationStatus().equals("PENDING")) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Verifying your data");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }
            if (user.getVerificationStatus().equals("REJECTED")) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Unfortunately your data not matched our standards");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            AuthResponse response = new AuthResponse("Login successful!", jwt, AuthResponse.UserResponse.fromUser(user));
            return ResponseEntity.ok(response);
        } catch (org.springframework.security.authentication.BadCredentialsException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid credentials. Incorrect password.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Server error during login.");
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User not found with that email address.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        User user = userOpt.get();
        user.setPassword(encoder.encode(request.getNewPassword()));
        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Password reset successfully!");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOwnAccount(@PathVariable Long id) {
        try {
            if (!userRepository.existsById(id)) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "User not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            userRepository.deleteById(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Account deleted successfully.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Server error during account deletion.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
