import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-friends-section',
    standalone: true,
    template: `
    <div class="friends-section">
      <h2 class="section-title">Following</h2>
      <div class="friends-list">
        <div *ngFor="let friend of following" class="friend-card">
          <span>{{ friend.username }}</span>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .friends-section {
      margin-top: 20px;
    }
    .section-title {
      font-weight: bold;
      margin-bottom: 10px;
    }
    .friends-list {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .friend-card {
      padding: 8px 12px;
      border-radius: 8px;
      background-color: #f2f2f2;
    }
  `]
})
export class FriendsSectionComponent implements OnInit {
    @Input() userId!: number;

    following: any[] = [];
    followers: any[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.http.get<any[]>(`/api/follows/following/${this.userId}`)
            .subscribe(data => this.following = data);

        this.http.get<any[]>(`/api/follows/followers/${this.userId}`)
            .subscribe(data => this.followers = data);
    }
}
