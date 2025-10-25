import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {Friend} from "../friendship/model/friend.interface";
import {FriendService} from "../friendship/friend.service";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    invites = 5;
    friends: Friend[] = [];

    constructor(private friendService: FriendService) {
    }

    ngOnInit(): void {
        this.friendService.getFriends().subscribe(
            friends => this.friends = friends,
        )
    }
}
