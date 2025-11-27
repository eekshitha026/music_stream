package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> payload) {
        String firstName = payload.get("firstName");
        String lastName = payload.get("lastName");
        String email = payload.get("email");
        String password = payload.get("password");

        if (email == null || password == null || firstName == null || lastName == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing fields"));
        }

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(409).body(Map.of("error", "Email already registered"));
        }

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email.toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "firstName", user.getFirstName(),
                "lastName", user.getLastName()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        return userRepository.findByEmail(email == null ? "" : email.toLowerCase())
                .map(u -> {
                    if (password != null && passwordEncoder.matches(password, u.getPasswordHash())) {
                        u.setLastLoginAt(LocalDateTime.now());
                        userRepository.save(u);
                        return ResponseEntity.ok(Map.of(
                                "id", u.getId(),
                                "email", u.getEmail(),
                                "firstName", u.getFirstName(),
                                "lastName", u.getLastName()
                        ));
                    }
                    return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
                })
                .orElseGet(() -> ResponseEntity.status(401).body(Map.of("error", "Invalid credentials")));
    }
}

