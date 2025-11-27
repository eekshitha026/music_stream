package com.example.demo.repository;

import com.example.demo.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findByGenreIgnoreCase(String genre);
    List<Song> findByMovieNameIgnoreCase(String movieName);
    List<Song> findByTypeIgnoreCase(String type);
}

