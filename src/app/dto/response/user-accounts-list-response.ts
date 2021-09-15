export class UserAccountsListResponse {
    public id: number;
    public partnerName: string;
    public branchShortName: string;
    public loginId: string;
    public accountName: string;
    public groupName: string;
    public description: string;

    constructor(id: number, partnerName: string, branchName: string, loginId: string, accountName: string, groupName: string, memo: string) {
        this.id = id;
        this.partnerName = partnerName;
        this.branchShortName = branchName;
        this.loginId = loginId;
        this.accountName= accountName
        this.groupName = groupName;
        this.description = memo;
    }
}