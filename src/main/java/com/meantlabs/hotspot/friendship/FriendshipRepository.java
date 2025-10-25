package com.meantlabs.hotspot.friendship;

import com.meantlabs.hotspot.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    List<Friendship> findByUserAndStatus(User currentUser, FriendshipStatus friendshipStatus);
}
