package com.example.demo.controller;

import com.example.demo.entity.Admin;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.SongRepository;
import com.example.demo.repository.PlaylistRepository;
import com.example.demo.repository.UserLikeRepository;
import com.example.demo.repository.PlaylistItemRepository;
import com.example.demo.repository.UserFollowRepository;
import com.example.demo.entity.Playlist;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private UserLikeRepository userLikeRepository;

    @Autowired
    private PlaylistItemRepository playlistItemRepository;

    @Autowired
    private UserFollowRepository userFollowRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody java.util.Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        return adminRepository.findByEmail(email == null ? "" : email.toLowerCase())
                .map(a -> {
                    if (password != null && passwordEncoder.matches(password, a.getPasswordHash())) {
                        return ResponseEntity.ok(java.util.Map.of(
                                "id", a.getId(),
                                "email", a.getEmail()));
                    }
                    return ResponseEntity.status(401).body(java.util.Map.of("error", "Invalid credentials"));
                })
                .orElseGet(() -> ResponseEntity.status(401).body(java.util.Map.of("error", "Invalid credentials")));
    }

    @GetMapping("/users")
    public ResponseEntity<?> users() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (userRepository.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        userLikeRepository.findByUserId(id).forEach(userLikeRepository::delete);
        userFollowRepository.findByFollowerId(id).forEach(userFollowRepository::delete);
        // Remove follows where this user is followed
        userFollowRepository.findAll().stream()
                .filter(f -> f.getFollowedId().equals(id))
                .forEach(userFollowRepository::delete);
        java.util.List<Playlist> pls = playlistRepository.findByUserId(id);
        pls.forEach(p -> playlistItemRepository.findByPlaylistId(p.getId()).forEach(playlistItemRepository::delete));
        pls.forEach(playlistRepository::delete);
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<?> stats() {
        long admins = adminRepository.count();
        long users = userRepository.count();
        long songs = songRepository.count();
        long playlists = playlistRepository.count();
        long likes = userLikeRepository.count();
        return ResponseEntity.ok(java.util.Map.of(
                "admins", admins,
                "users", users,
                "songs", songs,
                "playlists", playlists,
                "likes", likes));
    }
}
