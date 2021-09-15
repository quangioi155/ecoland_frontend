import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccountsListRequest } from '../../dto/request/user-accounts-list-request';
import { environment } from 'src/environments/environment';
import { EditCreateUserAccounts } from 'src/app/dto/request/edit-create-user-accounts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
/**
 * @export class SmallCategoryService
 *
 * user service
 *
 * author: Tien-ITS
 */
@Injectable({
  providedIn: 'root',
})
export class SmallCategoryService {
  constructor(private http: HttpClient) { }
  getSmallCategory(obj: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + 'api/smallCategory/list',
      obj,
      httpOptions
    );
  }
  delete(id: number): Observable<any> {
    return this.http.post(
      environment.apiUrl + 'api/smallCategory/delete/' + id,
      {},
      httpOptions
    );
  }
  detailSmallCategoryById(id: any): Observable<any> {
    return this.http.get(
      environment.apiUrl + 'api/smallCategory/detail?id=' + id,
      httpOptions
    );
  }
  createOrUpdateSmallCategory(data: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + 'api/smallCategory/editOrCreateSmallCategory' , data,
      httpOptions
    );
  }
}
