import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment.prod";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(payload: any) {
    return this.http.post(`${environment.apiUrl}/api/auth/register`, payload);
  }
}
