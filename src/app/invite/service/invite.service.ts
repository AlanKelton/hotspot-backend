import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invite} from "../model/invite.interface";
import {environment} from "../../../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class InviteService {
    constructor(private http: HttpClient) {}

    getUserInvites(): Observable<Invite[]> {
        return this.http.get<Invite[]>(`${environment.apiUrl}/api/invites`);
    }

    getInviteLink(inviteCode: string): Observable<Invite> {
        return this.http.get<Invite>(`${environment.apiUrl}/api/invites/` + inviteCode + '/link');
    }

    revokeInvite(code: string): Observable<any> {
        return this.http.post(`${environment.apiUrl}/api/invites/${code}/revoke`, {});
    }
}
