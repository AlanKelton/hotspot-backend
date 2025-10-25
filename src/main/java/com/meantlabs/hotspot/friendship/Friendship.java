package com.meantlabs.hotspot.friendship;

import com.meantlabs.hotspot.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "FRIENDSHIPS")
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "friendship_seq")
    @SequenceGenerator(name = "friendship_seq", sequenceName = "friendship_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "friend_id")
    private User friend;

    @Enumerated(EnumType.STRING)
    private FriendshipStatus status;

    private LocalDateTime createdAt = LocalDateTime.now();
}
