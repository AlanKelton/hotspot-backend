package com.meantlabs.hotspot.friendship;

import com.meantlabs.hotspot.user.User;
import com.meantlabs.hotspot.user.UserRepository;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    public FriendshipService(FriendshipRepository friendshipRepository, UserRepository userRepository) {
        this.friendshipRepository = friendshipRepository;
        this.userRepository = userRepository;
    }

    public Friendship newFriendship(User user, User friend) {

        Friendship friendship = new Friendship();
        friendship.setUser(user);
        friendship.setFriend(friend);
        friendship.setStatus(FriendshipStatus.ACTIVE);

        return friendshipRepository.save(friendship);
    }
    public List<User> getFriendsForUser(Principal principal) {
        User userForTest = getUserForTest(principal);

        return friendshipRepository.findByUserAndStatus(userForTest, FriendshipStatus.ACTIVE)
                .stream()
                .map(Friendship::getFriend)
                .toList();
    }
    public User getUserForTest(Principal principal) {
        String username = principal != null ? principal.getName() : "quarto";
        return userRepository.findByUsername(username).orElseThrow(
                () -> new IllegalArgumentException("User not found"));
    }
}
