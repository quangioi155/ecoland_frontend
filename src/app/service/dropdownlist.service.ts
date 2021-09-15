import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/**
 * @export class DropdownListService
 *
 * user service
 *
 * author: ITSG - ThaoTV
 */
@Injectable({
    providedIn: 'root'
})
export class DropdownListService {

    constructor(private http: HttpClient) { }

    getDropdownlistUserGroups(): Observable<any> {
        return this.http.get(environment.apiUrl + 'api/dropdownlist/user-group', httpOptions);
    }
    getDropdownlistBranches(): Observable<any> {
        return this.http.get(environment.apiUrl + 'api/dropdownlist/branches', httpOptions);
    }
    getDropdownListBranchesByPartnerId(id: any): Observable<any> {
        return this.http.get(environment.apiUrl + 'api/dropdownlist/branchesById?id=' + id, httpOptions);
    }
    getDropdownlistPartners(): Observable<any> {
        return this.http.get(environment.apiUrl + 'api/dropdownlist/partners', httpOptions);
    }
    getDropdownlistProductRank(): Observable<any> {
        return this.http.get(environment.apiUrl + 'api/dropdownlist/productRank', httpOptions);
    }
    getlistLargeCategory(): Observable<any> {
        return this.http.get(environment.apiUrl + 'api/dropdownlist/listLargeCategory', httpOptions);
    }

    getProductCategories(): Observable<any> {
        return this.http.get(environment.apiUrl + 'api/oemMappings/getProductCategories', httpOptions);
    }
    getOEMTypes(): Observable<any> {
        return this.http.get(environment.apiUrl + 'api/oemMappings/getOEMTypes', httpOptions);
    }

    getIntroduction(): Observable<any> {
        return this.http.get(environment.apiUrl + 'api/partnerCompanyBranch/getPartnerCompanies', httpOptions);
    }
}