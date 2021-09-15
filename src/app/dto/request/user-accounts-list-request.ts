import { PaginationRequest } from "../PaginationRequest";

/**
 * @export class UserAccountsListRequest
 *
 * user account request param
 *
 * author: ITSG - ThaoTV
 * update: ITSG - HoanNNC
 */
export class UserAccountsListRequest extends PaginationRequest {
    partnerId: number;
    branchId: number;
    loginId: string;
    accountName: string;
}