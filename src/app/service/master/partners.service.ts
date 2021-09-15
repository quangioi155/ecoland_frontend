import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/**
 * @export class PartnersService
 *
 * partners service
 *
 * author: ITSG - ThaoTV
 */
@Injectable({
    providedIn: 'root'
})
export class PartnersService {
    url = environment.apiUrl + 'api/partners';
    constructor(private http: HttpClient) { }

    getListPartners(): Observable<any> {
        return this.http.get(this.url + '/list', httpOptions);
    }
}