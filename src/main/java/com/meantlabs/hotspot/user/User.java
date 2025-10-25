package com.meantlabs.hotspot.user;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "USERS")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_seq", allocationSize = 1)
    private Long id;

    private String username;

    private String email;

    private String password;

}
