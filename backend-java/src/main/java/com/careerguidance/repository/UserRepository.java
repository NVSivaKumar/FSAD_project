package com.careerguidance.repository;

import com.careerguidance.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(String role);
    List<User> findByRoleNot(String role);
    List<User> findByVerificationStatus(String verificationStatus);
}
