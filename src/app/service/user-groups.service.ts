import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserGroupsList } from '../dto/request/user-groups-list-request';
import { EditOrCreateUserGroup } from '../dto/request/create-edit-user-groups';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/**
 * @export class UserGroupService
 *
 * author: ThaoTV
 */
@Injectable({
    providedIn: 'root'
})
export class UserGroupService {

    constructor(private http: HttpClient) { }

    getUserGroupsList(obj: UserGroupsList): Observable<any> {
        return this.http.post(environment.apiUrl + 'api/user_groups/search', obj, httpOptions);
    }
    deleteUserGroupById(id: any): Observable<any> {
        return this.http.post(environment.apiUrl + 'api/user_groups/deleteUserGroups?id=' + id, httpOptions);
    }
    detailUserGroupById(id: any): Observable<any> {
        return this.http.get(environment.apiUrl + 'api/user_groups/detailById?id=' + id, httpOptions);
    }
    createOrUpdateUserGroup(obj: EditOrCreateUserGroup): Observable<any> {
        return this.http.post(environment.apiUrl + 'api/user_groups/createOrEditUserGroup', obj, httpOptions);
    }
}