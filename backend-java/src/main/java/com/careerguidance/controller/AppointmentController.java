package com.careerguidance.controller;

import com.careerguidance.model.Appointment;
import com.careerguidance.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    AppointmentRepository appointmentRepository;

    @PostMapping
    public ResponseEntity<?> createAppointment(@RequestBody Appointment appointment) {
        try {
            Appointment saved = appointmentRepository.save(appointment);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Appointment scheduled successfully");
            response.put("appointment", saved);
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error scheduling appointment");
            response.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/{userId}/{role}")
    public ResponseEntity<?> getAppointments(@PathVariable Long userId, @PathVariable String role) {
        try {
            List<Appointment> appointments;
            if ("counselor".equalsIgnoreCase(role)) {
                appointments = appointmentRepository.findByCounselorId(userId);
            } else {
                appointments = appointmentRepository.findByStudentId(userId);
            }
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error fetching appointments");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateAppointmentStatus(@PathVariable Long id, @RequestBody Map<String, String> updates) {
        try {
            Optional<Appointment> apptOpt = appointmentRepository.findById(id);
            if (apptOpt.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Appointment not found");
                return ResponseEntity.status(404).body(response);
            }
            Appointment appointment = apptOpt.get();
            if (updates.containsKey("status")) {
                appointment.setStatus(updates.get("status"));
            }
            appointmentRepository.save(appointment);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Appointment status updated");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error updating appointment status");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<?> approveAppointment(@PathVariable Long id) {
        try {
            Optional<Appointment> apptOpt = appointmentRepository.findById(id);
            if (apptOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "Appointment not found"));
            }
            Appointment appointment = apptOpt.get();
            appointment.setStatus("Approved");
            appointmentRepository.save(appointment);

            return ResponseEntity.ok(Map.of("message", "Appointment approved successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Error approving appointment"));
        }
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<?> rejectAppointment(@PathVariable Long id) {
        try {
            Optional<Appointment> apptOpt = appointmentRepository.findById(id);
            if (apptOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "Appointment not found"));
            }
            Appointment appointment = apptOpt.get();
            appointment.setStatus("Rejected");
            appointmentRepository.save(appointment);

            return ResponseEntity.ok(Map.of("message", "Appointment rejected successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Error rejecting appointment"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id) {
        try {
            if (!appointmentRepository.existsById(id)) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Appointment not found");
                return ResponseEntity.status(404).body(response);
            }
            appointmentRepository.deleteById(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Appointment cancelled successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error cancelling appointment");
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
