package com.example.demo.repository;

import com.example.demo.entity.PlaylistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlaylistItemRepository extends JpaRepository<PlaylistItem, Long> {
    List<PlaylistItem> findByPlaylistId(Long playlistId);

    java.util.Optional<PlaylistItem> findByPlaylistIdAndSongId(Long playlistId, Long songId);
}
