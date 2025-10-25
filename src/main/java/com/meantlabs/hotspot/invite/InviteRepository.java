package com.meantlabs.hotspot.invite;

import com.meantlabs.hotspot.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface InviteRepository extends JpaRepository<Invite, Long> {

    List<Invite> findByOwnerAndStatusIn(User owner, Collection<InviteStatus> statuses);

    @Query("SELECT i FROM Invite i WHERE i.code = :code AND i.status = 'PENDING'")
    Optional<Invite> findPendingByCode(@Param("code") String code);

    Optional<Invite> findInviteByCodeAndStatusAndOwner(String code, InviteStatus status, User owner);
}
