import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Observer, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

const ADMIN_BASE_URL = 'http://localhost:8080/api/admin';

const HTTP_OPTION = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'body'
};

/**
 * @export class AdminService
 *
 * admin service
 *
 * author: ITSG - HoanNNC
 */
@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) {}

    getListGrantUser(): Observable<any> {
        return this.http.get(`${ADMIN_BASE_URL}/grant`, HTTP_OPTION);
    }

    grantRule(req: any): Observable<any> {
        return this.http.put(`${ADMIN_BASE_URL}/grant`, req, HTTP_OPTION)
        .pipe(catchError(this.handleError));
    }


    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('Your network occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Server returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
          'Something bad happened; please try again later.');
      }
}