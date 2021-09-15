import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchBranchRequest } from 'src/app/dto/request/search-branch-request';
import { EditOrCreateUserGroup } from 'src/app/dto/request/create-edit-user-groups';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/**
 * @export class BranchesService
 *
 * branches service
 *
 * author: thaotv-its
 */
@Injectable({
    providedIn: 'root'
})
export class BranchesService {
    url = environment.apiUrl + 'api/branches';
    constructor(private http: HttpClient) { }

    getListBranches(): Observable<any> {
        return this.http.get(this.url + '/list', httpOptions);
    }
    getSearchBranch(obj: SearchBranchRequest): Observable<any> {
        return this.http.post(environment.apiUrl + 'api/branches/search', obj, httpOptions);
    }
    deleteBranchById(id: any): Observable<any> {
        return this.http.post(environment.apiUrl + 'api/branches/deleteBranch?id=' + id, httpOptions);
    }
    detaiBranchById(id: any): Observable<any> {
        return this.http.get(environment.apiUrl + 'api/branches/detailById?id=' + id, httpOptions);
    }
    createOrUpdateBranch(obj: EditOrCreateUserGroup): Observable<any> {
        return this.http.post(environment.apiUrl + 'api/branches/createOrEditBranch', obj, httpOptions);
    }
}