import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {InviteService} from "../service/invite.service";

@Component({
  selector: 'app-invite-options',
  standalone: true,
  imports: [],
  templateUrl: './invite-options.component.html',
  styleUrl: './invite-options.component.scss'
})
export class InviteOptionsComponent implements OnInit {
    inviteCode!: string;
    inviteLink!: string;
    code: string | null = null;

    constructor(private route: ActivatedRoute, private inviteService: InviteService) {
        this.code = this.route.snapshot.paramMap.get('code');
    }

    ngOnInit() {
        this.inviteCode = this.route.snapshot.paramMap.get('code')!;
        console.log("inviteCode: ", this.inviteCode);
        this.inviteService.getInviteLink(this.inviteCode).subscribe(invite => {
            this.inviteLink = invite.link;
            console.log("invitedlink in sdrvice", this.inviteLink);
        });
    }

    copyLink() {
        console.log("invitedlink in copy", this.inviteLink);

        navigator.clipboard.writeText(this.inviteLink);
        alert('Link copied to clipboard!');
    }
}
