package com.meantlabs.hotspot.invite;

import com.meantlabs.hotspot.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Invite {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "invite_seq")
    @SequenceGenerator(name = "invite_seq", sequenceName = "invite_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(unique = true, nullable = false)
    private String code;

    @Enumerated(EnumType.STRING)
    private InviteStatus status = InviteStatus.PENDING;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime usedAt;

    private LocalDateTime revokedAt;

    @ManyToOne
    @JoinColumn(name = "used_by_id")
    private User usedBy;

}
