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
 * @export class UserAccoutsService
 *
 * user service
 *
 * author: ITSG - ThaoTV
 */
@Injectable({
    providedIn: 'root',
})
export class UserAccoutsService {
    constructor(private http: HttpClient) { }

    getUserAccountsList(obj: UserAccountsListRequest): Observable<any> {
        return this.http.post(
            environment.apiUrl + 'api/user/userAccountList',
            obj,
            httpOptions
        );
    }

    deleteUserAccountById(id: any): Observable<any> {
        return this.http.post(
            environment.apiUrl + 'api/user/deleteUserAccountById?id=' + id,
            httpOptions
        );
    }
    detailUserAccountsById(id: any): Observable<any> {
        return this.http.get(
            environment.apiUrl + 'api/user/detail?id=' + id,
            httpOptions
        );
    }
    createOrUpdateUserAccounts(data:EditCreateUserAccounts): Observable<any> {
        return this.http.post(
            environment.apiUrl + 'api/user/editOrCreateUserAccount' ,data,
            httpOptions
        );
    }
}
