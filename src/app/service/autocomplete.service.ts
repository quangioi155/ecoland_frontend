import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/**
 * @export class AutoCompleteService
 *
 * autocomplete service
 *
 * author: ITSG - ThaoTV
 */
@Injectable({
    providedIn: 'root'
})
export class AutoCompleteService {

    constructor(private http: HttpClient) { }

    getAutoComplete(): Observable<any> {
        return this.http.get(environment.apiUrl + 'api/autocomplete/listWebSmall', httpOptions);
    }
    
}