import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserAccountsListResponse } from "src/app/dto/response/user-accounts-list-response";

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
export class UserMasterService {
    data = [];

    constructor(private http: HttpClient) {
        this.data = this.createDummyData();
    }

    getListUserMaster(page: number, searchFields: any): UserAccountsListResponse[] {
        // todo dummy
        const start = (page - 1) * 50;
        const end = start + 50
        return this.data.slice(start, end);
    }

    createDummyData(): UserAccountsListResponse[] {
        const data = [];
        let item: UserAccountsListResponse;
        for (let i = 0; i < 299; i++) {

            item = new UserAccountsListResponse(i+1, `partner ${i+1}`, `branch ${i+1}`, `loginId ${i+1}`, `accountName ${i+1}`, `groupName ${i+1}`, `memo ${i+1}`);
            data.push(item)
        }

        return data;
    }
}