import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Friend} from "../model/friend.interface";
import {FriendService} from "../friend.service";

@Component({
    selector: 'app-friends',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
    friends: Friend[] = [];

    constructor(private friendService: FriendService) {}

    ngOnInit(): void {
        this.friendService.getFriends().subscribe({
            next: (data) => this.friends = data,
            error: (err) => console.error('Error loading friends', err)
        });
    }
}
