package com.meantlabs.hotspot.friendship;

import com.meantlabs.hotspot.user.User;
import com.meantlabs.hotspot.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class FriendshipServiceTest {

    private FriendshipService friendshipService;

    private final FriendshipRepository friendshipRepository = mock(FriendshipRepository.class);
    private final UserRepository userRepository = mock(UserRepository.class);

    @BeforeEach
    public void setUp() {
        friendshipService = new FriendshipService(friendshipRepository, userRepository);
    }

    @Test
    public void newFriendshipTest() {
        User user = new User();
        user.setId(1L);
        User friend = new User();
        friend.setId(2L);

        Friendship friendshipToSave = new Friendship();
        friendshipToSave.setUser(user);
        friendshipToSave.setFriend(friend);
        friendshipToSave.setStatus(FriendshipStatus.ACTIVE);

        when(friendshipRepository.save(any(Friendship.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Friendship friendship = friendshipService.newFriendship(user, friend);

        assertEquals(user, friendship.getUser());
        assertEquals(friend, friendship.getFriend());
        assertEquals(FriendshipStatus.ACTIVE, friendship.getStatus());
    }

}
