package com.example.demo.controller;

import com.example.demo.entity.Song;
import com.example.demo.repository.SongRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class SongController {
    @Autowired
    private SongRepository songRepository;

    @Value("${file.storage.songs-dir:songs}")
    private String songsDir;

    @PostMapping("/admin/songs")
    public ResponseEntity<?> uploadSong(
            @RequestParam("title") String title,
            @RequestParam(value = "movieName", required = false) String movieName,
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "coverImageBase64", required = false) String coverImageBase64,
            @RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", "File required"));
        }
        Path dir = Paths.get(songsDir).toAbsolutePath();
        Files.createDirectories(dir);
        String original = file.getOriginalFilename();
        String clean = java.util.UUID.randomUUID() + "_"
                + (original == null ? "song.mp3" : original.replaceAll("[^a-zA-Z0-9._-]", "_"));
        Path target = dir.resolve(clean);
        Files.write(target, file.getBytes());

        Song song = new Song();
        song.setTitle(title);
        song.setMovieName(movieName);
        song.setGenre(genre);
        song.setType(type);
        song.setCoverImageBase64(coverImageBase64);
        song.setFilePath("/media/songs/" + clean);
        song.setCreatedAt(LocalDateTime.now());
        songRepository.save(song);
        return ResponseEntity.ok(song);
    }

    @GetMapping("/songs")
    public ResponseEntity<?> listSongs(
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "movie", required = false) String movie,
            @RequestParam(value = "type", required = false) String type) {
        List<Song> songs;
        if (genre != null && !genre.isBlank()) {
            songs = songRepository.findByGenreIgnoreCase(genre);
        } else if (movie != null && !movie.isBlank()) {
            songs = songRepository.findByMovieNameIgnoreCase(movie);
        } else if (type != null && !type.isBlank()) {
            songs = songRepository.findByTypeIgnoreCase(type);
        } else {
            songs = songRepository.findAll();
        }
        return ResponseEntity.ok(songs);
    }

    @DeleteMapping("/admin/songs/{id}")
    public ResponseEntity<?> deleteSong(@PathVariable Long id) throws IOException {
        return songRepository.findById(id)
                .map(song -> {
                    try {
                        if (song.getFilePath() != null && song.getFilePath().startsWith("/media/songs/")) {
                            String fileName = song.getFilePath().substring("/media/songs/".length());
                            Path file = Paths.get(songsDir).toAbsolutePath().resolve(fileName);
                            Files.deleteIfExists(file);
                        }
                    } catch (Exception ignored) {
                    }
                    songRepository.delete(song);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
