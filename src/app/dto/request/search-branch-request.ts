import { PaginationRequest } from "../PaginationRequest";

export class SearchBranchRequest extends PaginationRequest {
    branchName: string;
    partnerId: number;
}