import { Component, OnInit } from '@angular/core';
import { InviteService } from "./service/invite.service";
import { Invite } from "./model/invite.interface";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'app-invites',
    templateUrl: './invite.component.html',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    styleUrls: ['./invite.component.scss'],
    animations: [
        trigger('fadeSlide', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class InviteComponent implements OnInit {
    invites: Invite[] = [];

    constructor(
        private inviteService: InviteService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.loadInvites();
    }

    loadInvites() {
        this.inviteService.getUserInvites().subscribe({
            next: (data) => this.invites = this.sortInvites(data),
            error: (err) => console.error('Error loading invites', err)
        });
    }

    openInviteOptions(invite: Invite) {
        if (invite.status === 'NEW') {
            this.router.navigate(['/invite-options', invite.code]);
        }
    }

    revoke(invite: Invite) {
        this.inviteService.revokeInvite(invite.code).subscribe({
            next: newInvite => {
                invite.status = 'REVOKED';
                this.invites.push(newInvite);
                this.invites = this.sortInvites(this.invites.filter(i => i.code !== invite.code));
            },
            error: err => console.error(err)
        });
    }

    private sortInvites(invites: Invite[]): Invite[] {
        const priority: Record<string, number> = {
            'NEW': 1,
            'PENDING': 2,
            'USED': 3,
            'REVOKED': 4
        };
        return invites.sort((a, b) =>
            (priority[a.status] || 99) - (priority[b.status] || 99)
        );
    }

    // ===== Helpers para template =====
    getInviteBg(invite: Invite): string {
        const isDark = document.body.classList.contains('dark'); // detecta dark mode
        switch (invite.status) {
            case 'NEW':
                return isDark ? 'var(--color-hotspot)/20' : 'var(--color-hotspot)/30';
            case 'PENDING':
                return isDark ? '#78350f' : '#fef3c7';
            case 'USED':
                return isDark ? '#374151' : '#e5e7eb';
            case 'REVOKED':
                return isDark ? '#7f1d1d' : '#fee2e2';
            default:
                return isDark ? '#111827' : 'var(--color-bg)';
        }
    }


    getInviteCursor(invite: Invite): string {
        return invite.status === 'NEW' ? 'pointer' : 'default';
    }
}
