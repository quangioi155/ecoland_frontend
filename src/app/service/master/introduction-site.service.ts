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
export class IntroductionSiteService {

  private apiUrl: string = environment.apiUrl + 'api/partnerCompanyBranch';

  constructor(private http: HttpClient) { }

  searchIntroductionSite(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/search', req, httpOptions);
  }

  deleteIntroductionSite(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/delete', req, httpOptions);
  }

  getIntroductionSiteDetail(req: any): Observable<any> {
    return this.http.get(this.apiUrl + '/detail?id=' + req.id, httpOptions);
  }

  updateIntroductionSite(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/editOrCreate', req, httpOptions);
  }
}
