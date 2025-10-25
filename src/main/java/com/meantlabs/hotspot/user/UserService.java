package com.meantlabs.hotspot.user;

import com.meantlabs.hotspot.friendship.FriendshipService;
import com.meantlabs.hotspot.invite.Invite;
import com.meantlabs.hotspot.invite.InviteService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final InviteService inviteService;
    private final FriendshipService friendshipService;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder, InviteService inviteService, FriendshipService friendshipService) {
        this.userRepository = repository;
        this.passwordEncoder = passwordEncoder;
        this.inviteService = inviteService;
        this.friendshipService = friendshipService;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Transactional
    public User createUser(RegisterRequest request) {
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(encodedPassword);

        User savedUser = userRepository.save(user);

        Invite invite = inviteService.useInvite(request.getInviteCode(), savedUser);
        inviteService.generateInitialInvites(savedUser);

        friendshipService.newFriendship(invite.getOwner(), savedUser);

        return savedUser;
    }
}
