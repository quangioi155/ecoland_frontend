import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * @export class AuthService
 *
 * auth service
 *
 * author: ITSG - ThaoTV
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    login(credentials): Observable<any> {
        return this.http.post(environment.apiUrl + 'api/auth/login', credentials.value, httpOptions);
    }

    register(user): Observable<any> {
        return this.http.post(environment.apiUrl + 'api/auth/sigup', user, httpOptions);
    }
    logout(strToken: any): Observable<any> {
        let token = {};
        token['token'] = strToken;
        return this.http.post(environment.apiUrl + 'api/auth/logout', token, httpOptions);
    }

}