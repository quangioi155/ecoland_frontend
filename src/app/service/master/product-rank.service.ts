import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * @export class ProductRankService
 *
 * product rank service
 *
 * author: ITSG - HoanNNC
 */
@Injectable({
  providedIn: 'root'
})
export class ProductRankService {
  private apiUrl: string = environment.apiUrl + 'api/rank';

  constructor(private http: HttpClient) {}

  searchRank(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/search', req, httpOptions);
  }

  deleteRank(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/delete', req, httpOptions);
  }

  getRankDetail(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/detail', req, httpOptions);
  }

  updateRank(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/update', req, httpOptions);
  }
}
