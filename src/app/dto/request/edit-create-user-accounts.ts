export class EditCreateUserAccounts {
    id: number;
    loginId: string;
    loginPassword: string;
    employeeCd: string;
    accountName: string;
    accountNameKana: string;
    userGroupId: number;
    partnerId: number;
    branchId: number;
    description: string;

    constructor(id?: number, loginId?: string, loginPassword?: string, employeeCd?: string, accountName?: string, accountNameKana?: string,
        userGroupId?: number, partnerId?: number, branchId?: number, description?: string) {
        this.id = id;
        this.loginId = loginId;
        this.loginPassword = loginPassword;
        this.employeeCd = employeeCd;
        this.accountNameKana = accountNameKana;
        this.accountName = accountName;
        this.userGroupId = userGroupId;
        this.partnerId = partnerId;
        this.branchId = branchId;
        this.description = description;
    }
}