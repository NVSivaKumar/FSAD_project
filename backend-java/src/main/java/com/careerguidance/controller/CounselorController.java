package com.careerguidance.controller;

import com.careerguidance.model.User;
import com.careerguidance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/counselors")
public class CounselorController {

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getCounselors() {
        try {
            List<User> counselors = userRepository.findByRole("Counselor");
            return ResponseEntity.ok(counselors);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error fetching counselors");
            response.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
