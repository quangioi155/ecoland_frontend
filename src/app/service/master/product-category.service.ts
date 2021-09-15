import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchBranchRequest } from 'src/app/dto/request/search-branch-request';
import { EditOrCreateUserGroup } from 'src/app/dto/request/create-edit-user-groups';
import { RequestFilterDTO } from 'src/app/dto/request/request-filter';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/**
 * @export class Product category Service
 *
 * product category service
 *
 * author: thaotv-its
 */
@Injectable({
    providedIn: 'root'
})
export class ProductCategoryService {
    url = environment.apiUrl + 'api/productCategory';
    constructor(private http: HttpClient) { }

    getSearchProductCategory(obj: RequestFilterDTO): Observable<any> {
        return this.http.post(this.url + '/search', obj, httpOptions);
    }
    deleteProductCategoryById(id: any): Observable<any> {
        return this.http.post(this.url + '/deleteProductCategory?id=' + id, httpOptions);
    }
    detaiProductCategoryById(id: any): Observable<any> {
        return this.http.get(this.url + '/detailById?id=' + id, httpOptions);
    }
    createOrEditProductCategory(obj: any): Observable<any> {
        return this.http.post(this.url + '/createOrEditProductCategory', obj, httpOptions);
    }
}