package com.meantlabs.hotspot.invite;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/invites")
@CrossOrigin
public class InviteController {

    private final InviteService inviteService;

    public InviteController(InviteService inviteService) {
        this.inviteService = inviteService;
    }


    @GetMapping
    public ResponseEntity<List<Invite>> getInvites(Principal principal) {
        return ResponseEntity.ok(inviteService.getInvitesForUser(principal));
    }

    @GetMapping("/{code}/link")
    public ResponseEntity<Map<String, String>> getInviteLink(@PathVariable String code, Principal principal) {
        Invite invite = inviteService.getInviteByCodeForUser(code, principal);
        String link = inviteService.generateInviteLink(invite);

        return ResponseEntity.ok(Map.of("link", link));
    }

    @PostMapping("/{code}/revoke")
    public ResponseEntity<Invite> revokeInvite(@PathVariable String code, Principal principal) {
        Invite invite = inviteService.revokeInvite(code, principal);
        return ResponseEntity.ok(invite);
    }


}
