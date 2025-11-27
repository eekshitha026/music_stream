package com.example.demo.repository;

import com.example.demo.entity.UserFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserFollowRepository extends JpaRepository<UserFollow, Long> {
    long countByFollowedId(Long followedId);
    long countByFollowerId(Long followerId);
    Optional<UserFollow> findByFollowerIdAndFollowedId(Long followerId, Long followedId);
    List<UserFollow> findByFollowerId(Long followerId);
}
