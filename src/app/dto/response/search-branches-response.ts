import { PartnersResponse } from "./partners";

export class SearchBranchesResponse{
    public id: number;
    public branchName: string;
    public branchShortName: string;
    public address: string;
    public postalCode: string
    public tel: string;
    public fax: string;
    public inputCorpSite: number;
    public startDate: Date;
    public endDate: Date;
    public delivCorpSite: number;
    public branchCode: string
    public partners: PartnersResponse
}