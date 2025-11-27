package com.example.demo.repository;

import com.example.demo.entity.UserLike;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserLikeRepository extends JpaRepository<UserLike, Long> {
    List<UserLike> findByUserId(Long userId);
    Optional<UserLike> findByUserIdAndSongId(Long userId, Long songId);
}

