import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Friend} from "./model/friend.interface";

@Injectable({
    providedIn: 'root'
})
export class FriendService {
    constructor(private http: HttpClient) {}

    getFriends(): Observable<Friend[]> {
        return this.http.get<Friend[]>('/api/friends');
    }
}
