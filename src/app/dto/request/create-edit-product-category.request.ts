export class CreateOrEditProductCategoryRequest {
    id: number;
    categoryName: string;
    pickupFeeNoTax: number;
    warewhousingFeeNoTax: number;
    warehousingTransactionFee: number;
    standardRankId: number;
    recoverableFlag: boolean;
    keywords: string;
    webDispFlag: boolean;
    webSmallCategoryId: number;
    imgFilePath: string;
    managementOut: boolean;
}