export class ConstantsCommon {
    public static HTTP_STATUS_200 = "200";
    public static HTTP_STATUS_403 = "403";
    //label
    public static CATG_FIELD = 'カテゴリ名';
    public static PRODUCT_CATG = '商品カテゴリ';
    public static OEM_TYPE = 'OEMタイプ';
    public static OEM_CATG = 'OEMカテゴリ';
    public static OEM_CATG_CD = 'OEMカテゴリCD';
}
/**
 * @export enum eRole
 *
 * common Rule name
 *
 * author: ITSG - HoanNNC
 */
export enum eRole {
    ROLE_USER = "ROLE_USER",
    CONTACT_CUSTOMER_FLAG = "CONTACT_CUSTOMER_FLAG",
    DRIVER_FLAG = "DRIVER_FLAG",
    VEHICLE_DISPATCH_FLAG = "VEHICLE_DISPATCH_FLAG",
    ZEC_FLAG = "ZEC_FLAG",
    MANAGE_FLAG = "MANAGE_FLAG",
    WAREHOUSE_FLAG = "WAREHOUSE_FLAG",
    SYSTEM_FLAG = "SYSTEM_FLAG"
}

/**
 * @export enum eMenu
 *
 * common main menu
 *
 * author: ITSG - HoanNNC
 */
export enum eMenu {
    CUSTOMER = "お客様対応",
    DRIVER = "ドライバー",
    DISPATCH_VERHICLE = "配車",
    ZEC = "ZEC",
    MANAGER = "マネージメント",
    WAREHOUSE = "倉庫",
    SYSTEM = "システム管理"
}

/**
 * @export enum eSystemMenu
 *
 * common system sub name
 *
 * author: ITSG - HoanNNC
 */
export enum eSystemMenu {
    USER_MASTER = "利用者マスタ",
    USER_GROUP_MASTER = "権限グループ",
    COMPANY_GROUP_MASTER = "企業グループマスタ",
    MASTER_BASE = "拠点マスタ",
    PRODUCT_RANK_MASTER = "商品ランクマスタ",
    WEB_LG_CATG_MASTER = "WEB大カテゴリマスタ",
    WEB_SM_CATG_MASTER = "WEB小カテゴリマスタ",
    PRODUCT_CATG_MASTER = "商品カテゴリマスタ",
    OEM_TYPE_MASTER = "OEMタイプマスタ",
    OEM_MAPPING_MASTER = "OEMマッピングマスタ",
    PARTNER_COMPANY_MASTER = "提携企業マスタ",
    PARTNER_COMPANY_LIST = "提携企業拠点マスタ",
    MASTER_MEDIA = "媒体マスタ",
    OUTSOURCE_MASTER = "外注先マスタ",
    OUTSOURCE_SERVICE_MASTER = "外注作業マスタ",
    MAIN_TEMPLATE_MASTER = "メールテンプレートマスタ",
    ZEC_MASTER = "販売先マスタ(ZEC)",
    TAX_MASTER = "税マスタ"
}