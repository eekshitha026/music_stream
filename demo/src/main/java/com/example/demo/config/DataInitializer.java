package com.example.demo.config;

import com.example.demo.entity.Admin;
import com.example.demo.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner initAdmin(AdminRepository adminRepository) {
        return args -> {
            String email = "admin@streamify.com";
            String password = "Admin@123";
            if (adminRepository.findByEmail(email).isEmpty()) {
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                Admin admin = new Admin();
                admin.setEmail(email);
                admin.setPasswordHash(encoder.encode(password));
                adminRepository.save(admin);
            }
        };
    }
}

