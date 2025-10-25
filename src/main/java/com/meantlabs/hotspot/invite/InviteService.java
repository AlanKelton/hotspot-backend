package com.meantlabs.hotspot.invite;

import com.meantlabs.hotspot.config.InviteConfig;
import com.meantlabs.hotspot.user.User;
import com.meantlabs.hotspot.user.UserRepository;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class InviteService {

    private final InviteRepository inviteRepository;
    private final UserRepository userRepository;
    private final InviteConfig inviteConfig;

    public InviteService(InviteRepository inviteRepository, UserRepository userRepository, InviteConfig inviteConfig) {
        this.inviteRepository = inviteRepository;
        this.userRepository = userRepository;
        this.inviteConfig = inviteConfig;
    }

    public Invite generateNewInvite(Principal principal) {
        User owner = getUserForTest(principal);
            Invite invite = new Invite();
            invite.setOwner(owner);
            invite.setStatus(InviteStatus.NEW);
            invite.setCode(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            return inviteRepository.save(invite);
    }

    public Invite useInvite(String code, User usedBy) {

        Invite invite = inviteRepository.findPendingByCode(code)
                .orElseThrow(() -> new IllegalArgumentException("Invalid invite code"));

        invite.setStatus(InviteStatus.USED);
        invite.setUsedAt(LocalDateTime.now());
        invite.setUsedBy(usedBy);

        return inviteRepository.save(invite);
    }

    public Invite revokeInvite(String inviteCode, Principal principal) {
        User owner = getUserForTest(principal);
        Invite invite = inviteRepository.findPendingByCode(inviteCode)
                .orElseThrow(() -> new IllegalArgumentException("Invite not found"));

        if (!invite.getOwner().equals(owner)) {
            throw new SecurityException("You cannot revoke someone else's invite");
        }

        if (invite.getStatus() != InviteStatus.PENDING) {
            throw new IllegalStateException("Only pending invites can be revoked");
        }

        invite.setStatus(InviteStatus.REVOKED);
        invite.setRevokedAt(LocalDateTime.now());

        Invite newInvite = generateNewInvite(principal);

        return inviteRepository.save(newInvite);
    }

    public void generateInitialInvites(User user) {
        int count = inviteConfig.getInitialCount();

        for (int i = 0; i < count; i++) {
            Invite invite = new Invite();
            invite.setCode(UUID.randomUUID().toString());
            invite.setOwner(user);
            invite.setStatus(InviteStatus.NEW);
            inviteRepository.save(invite);
        }
    }

    public List<Invite> getInvitesForUser(Principal principal) {
        User owner = getUserForTest(principal);

        return inviteRepository.findByOwnerAndStatusIn(
            owner, List.of(InviteStatus.NEW, InviteStatus.PENDING, InviteStatus.USED)
        );
    }

    public String generateInviteLink(Invite invite) {
        invite.setStatus(InviteStatus.PENDING);
        inviteRepository.save(invite);
        return "https://meantlabs.com/register?invite=" + invite.getCode();
    }

    public Invite getInviteByCodeForUser(String code, Principal principal) {
        User owner = getUserForTest(principal);
        return inviteRepository.findInviteByCodeAndStatusAndOwner(code, InviteStatus.NEW, owner)
                .orElseThrow(() -> new IllegalArgumentException("Invite not found"));
    }

    private User getUserForTest(Principal principal) {
        String username = principal != null ? principal.getName() : "quarto";
        return userRepository.findByUsername(username).orElseThrow(
                () -> new IllegalArgumentException("User not found"));
    }
}
