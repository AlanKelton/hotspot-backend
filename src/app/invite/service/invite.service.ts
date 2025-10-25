import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invite} from "../model/invite.interface";

@Injectable({
    providedIn: 'root'
})
export class InviteService {
    constructor(private http: HttpClient) {}

    getUserInvites(): Observable<Invite[]> {
        return this.http.get<Invite[]>('/api/invites');
    }

    getInviteLink(inviteCode: string): Observable<Invite> {
        return this.http.get<Invite>('/api/invites/' + inviteCode + '/link');
    }

    revokeInvite(code: string): Observable<any> {
        return this.http.post(`/api/invites/${code}/revoke`, {});
    }
}
