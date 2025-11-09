package com.meantlabs.hotspot.friendship;

import com.meantlabs.hotspot.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/friends")
@RequiredArgsConstructor
@CrossOrigin
public class FriendshipController {

    private final FriendshipService friendshipService;

    @GetMapping
    public ResponseEntity<List<User>> getFriends(Principal principal) {
        return ResponseEntity.ok(friendshipService.getFriendsForUser(principal));
    }
}

