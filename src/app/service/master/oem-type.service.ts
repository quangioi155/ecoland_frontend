import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * @export class OemTypeService
 *
 * oem type service
 *
 * author: ITSG - HoanNNC
 */
@Injectable({
  providedIn: 'root'
})
export class OemTypeService {
  private apiUrl: string = environment.apiUrl + 'api/oemType';

  constructor(private http: HttpClient) {}

  searchOemType(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/search', req, httpOptions);
  }

  deleteOemType(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/delete', req, httpOptions);
  }

  getOemTypeDetail(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/detail', req, httpOptions);
  }

  updateOemType(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/update', req, httpOptions);
  }
}
