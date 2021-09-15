import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/**
 * @export class IntroductionService
 *
 * introduction service
 *
 * author: ITSG - HoanNNC
 */
@Injectable({
  providedIn: 'root'
})
export class IntroductionService {
  private apiUrl: string = environment.apiUrl + 'api/introduction';

  constructor(private http: HttpClient) {}

  searchIntroduction(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/search', req, httpOptions);
  }

  deleteIntroduction(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/delete', req, httpOptions);
  }

  getIntroductionDetail(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/detail', req, httpOptions);
  }

  updateIntroduction(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/update', req, httpOptions);
  }
}
