import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * @export class CategoryService
 *
 * Categorys service
 *
 * author: Tien-ITS
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = environment.apiUrl + 'api/webLargeCategories';

  constructor(private http: HttpClient) {}

  searchCategoryMater(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/search', req, httpOptions);
  }

  deleteCategoryMater(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/delete?id='+ req.id, httpOptions);
  }

  registOrEditCategoryMater(req: any): Observable<any> {
    return this.http.post(this.apiUrl + '/editOrCreate', req, httpOptions);
  }

  getInfoDetail(req: any): Observable<any> {
    return this.http.get(this.apiUrl + '/detail?id='+ req.id, httpOptions);
  }
}
