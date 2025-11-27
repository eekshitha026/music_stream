package com.example.demo.controller;

import com.example.demo.entity.Playlist;
import com.example.demo.entity.PlaylistItem;
import com.example.demo.entity.Song;
import com.example.demo.entity.User;
import com.example.demo.entity.UserLike;
import com.example.demo.entity.UserFollow;
import com.example.demo.repository.PlaylistItemRepository;
import com.example.demo.repository.PlaylistRepository;
import com.example.demo.repository.SongRepository;
import com.example.demo.repository.UserLikeRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.UserFollowRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserLikeRepository userLikeRepository;
    @Autowired
    private SongRepository songRepository;
    @Autowired
    private PlaylistRepository playlistRepository;
    @Autowired
    private PlaylistItemRepository playlistItemRepository;
    @Autowired
    private UserFollowRepository userFollowRepository;

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .<ResponseEntity<?>>map(u -> ResponseEntity.ok(Map.of(
                        "id", u.getId(),
                        "firstName", u.getFirstName(),
                        "lastName", u.getLastName(),
                        "email", u.getEmail())))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/songs/{songId}/like")
    public ResponseEntity<?> like(@PathVariable Long songId, @RequestParam Long userId) {
        if (userLikeRepository.findByUserIdAndSongId(userId, songId).isPresent()) {
            return ResponseEntity.ok().build();
        }
        UserLike like = new UserLike();
        like.setUserId(userId);
        like.setSongId(songId);
        userLikeRepository.save(like);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/songs/{songId}/like")
    public ResponseEntity<?> unlike(@PathVariable Long songId, @RequestParam Long userId) {
        userLikeRepository.findByUserIdAndSongId(userId, songId).ifPresent(userLikeRepository::delete);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{userId}/likes")
    public ResponseEntity<?> likes(@PathVariable Long userId) {
        List<UserLike> likes = userLikeRepository.findByUserId(userId);
        List<Song> songs = likes.stream()
                .map(l -> songRepository.findById(l.getSongId()).orElse(null))
                .filter(java.util.Objects::nonNull)
                .collect(Collectors.toList());
        return ResponseEntity.ok(songs);
    }

    @PostMapping("/users/{userId}/playlists")
    public ResponseEntity<?> createPlaylist(@PathVariable Long userId, @RequestBody Map<String, String> payload) {
        String title = payload.get("title");
        if (title == null || title.isBlank())
            return ResponseEntity.badRequest().body(Map.of("error", "Title required"));
        Playlist p = new Playlist();
        p.setUserId(userId);
        p.setTitle(title);
        playlistRepository.save(p);
        return ResponseEntity.ok(p);
    }

    @PostMapping("/users/{userId}/playlists/{playlistId}/items")
    public ResponseEntity<?> addToPlaylist(@PathVariable Long userId, @PathVariable Long playlistId,
            @RequestBody Map<String, Long> payload) {
        Long songId = payload.get("songId");
        if (songId == null)
            return ResponseEntity.badRequest().body(Map.of("error", "songId required"));
        if (playlistRepository.findById(playlistId).isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "Playlist not found"));
        }
        if (songRepository.findById(songId).isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "Song not found"));
        }
        if (playlistItemRepository.findByPlaylistIdAndSongId(playlistId, songId).isPresent()) {
            return ResponseEntity.ok(Map.of("playlistId", playlistId, "songId", songId, "status", "exists"));
        }
        PlaylistItem item = new PlaylistItem();
        item.setPlaylistId(playlistId);
        item.setSongId(songId);
        playlistItemRepository.save(item);
        return ResponseEntity.ok(Map.of("playlistId", playlistId, "songId", songId));
    }

    @GetMapping("/users/{userId}/playlists")
    public ResponseEntity<?> listPlaylists(@PathVariable Long userId) {
        List<Playlist> p = playlistRepository.findByUserId(userId);
        return ResponseEntity.ok(p);
    }

    @GetMapping("/users")
    public ResponseEntity<?> listUsers() {
        List<User> users = userRepository.findAll();
        List<Map<String, Object>> out = users.stream().map(u -> {
            Map<String, Object> m = new java.util.HashMap<>();
            m.put("id", u.getId());
            m.put("firstName", u.getFirstName());
            m.put("lastName", u.getLastName());
            m.put("email", u.getEmail());
            return m;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(out);
    }

    @PostMapping("/users/{userId}/follow/{targetId}")
    public ResponseEntity<?> follow(@PathVariable Long userId, @PathVariable Long targetId) {
        if (userId.equals(targetId))
            return ResponseEntity.badRequest().body(Map.of("error", "invalid"));
        if (userRepository.findById(userId).isEmpty() || userRepository.findById(targetId).isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
        if (userFollowRepository.findByFollowerIdAndFollowedId(userId, targetId).isEmpty()) {
            UserFollow f = new UserFollow();
            f.setFollowerId(userId);
            f.setFollowedId(targetId);
            userFollowRepository.save(f);
        }
        long followers = userFollowRepository.countByFollowedId(targetId);
        long following = userFollowRepository.countByFollowerId(userId);
        return ResponseEntity.ok(Map.of("followers", followers, "following", following));
    }

    @DeleteMapping("/users/{userId}/follow/{targetId}")
    public ResponseEntity<?> unfollow(@PathVariable Long userId, @PathVariable Long targetId) {
        userFollowRepository.findByFollowerIdAndFollowedId(userId, targetId)
                .ifPresent(userFollowRepository::delete);
        long followers = userFollowRepository.countByFollowedId(targetId);
        long following = userFollowRepository.countByFollowerId(userId);
        return ResponseEntity.ok(Map.of("followers", followers, "following", following));
    }

    @GetMapping("/users/{userId}/following")
    public ResponseEntity<?> following(@PathVariable Long userId) {
        List<UserFollow> f = userFollowRepository.findByFollowerId(userId);
        List<User> users = f.stream()
                .map(x -> userRepository.findById(x.getFollowedId()).orElse(null))
                .filter(java.util.Objects::nonNull)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users.stream().map(u -> Map.of(
                "id", u.getId(),
                "firstName", u.getFirstName(),
                "lastName", u.getLastName(),
                "email", u.getEmail())).collect(Collectors.toList()));
    }

    @GetMapping("/users/{userId}/followers-count")
    public ResponseEntity<?> followersCount(@PathVariable Long userId) {
        return ResponseEntity.ok(Map.of("count", userFollowRepository.countByFollowedId(userId)));
    }

    @GetMapping("/users/{userId}/following-count")
    public ResponseEntity<?> followingCount(@PathVariable Long userId) {
        return ResponseEntity.ok(Map.of("count", userFollowRepository.countByFollowerId(userId)));
    }
}
