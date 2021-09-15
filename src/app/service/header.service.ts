import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/**
 * @export class HeaderService
 *
 * user service
 *
 * author: ITSG - ThaoTV
 */
@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    constructor(private http: HttpClient) { }

    getInforUserLogin(): Observable<any> {
        return this.http.get(environment.apiUrl + 'api/header/inforUserLogin', httpOptions);
    }
}