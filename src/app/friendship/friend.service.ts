import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Friend} from "./model/friend.interface";
import {environment} from "../../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class FriendService {
    constructor(private http: HttpClient) {}

    getFriends(): Observable<Friend[]> {
        return this.http.get<Friend[]>(`${environment.apiUrl}/api/friends`);
    }
}
