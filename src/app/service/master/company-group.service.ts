import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * @export class ComnanyGroupService
 *
 * company group service
 *
 * author: ITSG - HoanNNC
 */
@Injectable({
  providedIn: 'root'
})
export class CompanyGroupService {
  private apiUrl: string = environment.apiUrl + 'api/company';

  constructor(private http: HttpClient) {}

  searchCompanyGroup(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/search', req, httpOptions);
  }

  deleteCompanyGroup(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/delete', req, httpOptions);
  }

  registOrEditCompanyGroup(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/update', req, httpOptions);
  }

  getInfoDetail(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/detail', req, httpOptions);
  }
}
