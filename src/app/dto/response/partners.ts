import { CommonEntity } from "../entytiesCommon";

export class PartnersResponse extends CommonEntity{
    public id: number;
    public partnerName: string;
    public mainFlag: boolean;
    public address1: string;
    public address2: string;
    public address3: string;
    public postalCode: string
    public tel: string;
    public fax: string;
    public mailAddress: string;
    public startDate: Date;
    public endDate: Date;
    public managerName: string;
}