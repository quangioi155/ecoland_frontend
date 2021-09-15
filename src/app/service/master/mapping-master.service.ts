import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
/**
 * @export class MappingMasterService
 *
 * OEM Mapping Master [service]
 *
 * author: HoanNNC-ITS
 */
@Injectable({
  providedIn: 'root',
})
export class MappingMasterService {
  private apiUrl: string = environment.apiUrl + 'api/oemMappings/';
  constructor(private http: HttpClient) { }

  getMappingMatersList(obj: any): Observable<any> {
    return this.http.post(
      this.apiUrl + 'search',
      obj,
      httpOptions
    );
  }

  deleteMappingMaterById(id: any): Observable<any> {
    return this.http.post(
      this.apiUrl + 'delete?id=' + id,
      httpOptions
    );
  }
  detailMappingMatersById(id: any): Observable<any> {
    return this.http.get(
      this.apiUrl + 'detail?id=' + id,
      httpOptions
    );
  }
  createOrUpdateMappingMaters(data: any): Observable<any> {
    return this.http.post(
      this.apiUrl + 'editOrCreate', data,
      httpOptions
    );
  }

}