import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { PRODUCT_CATEGORY } from 'src/app/common/common-filter';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { LabelCommon, MasterCommon, PlaceholderText } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import { Filter } from 'src/app/dto/filter';
import { RequestFilterDTO } from 'src/app/dto/request/request-filter';
import { ProductCategoryListResponse } from 'src/app/dto/response/product-category-list-response';
import { DropdownListService } from 'src/app/service/dropdownlist.service';
import { ProductCategoryService } from 'src/app/service/master/product-category.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ProductCategoryListComponent implements OnInit {

  /* screen title */
  titleProductCategory: string = eSystemMenu.PRODUCT_CATG_MASTER;

  /* categoryname label */
  categoryNameLabel: string = LabelCommon.CATEGORY_NAME;

  /* product rank label */
  productRankLabel: string = LabelCommon.PRODUCT_RANK;

  /* placeholder select */
  placeholderSelect: string = PlaceholderText.PLACEHOLDER_SELECT;

  /* register label */
  registLabel: string = MasterCommon.REGIST_LABEL;

  /* search label */
  searchLabel: string = MasterCommon.SEARCH_LABEL;

  /* recycleFurniture label */
  recycledFurnitureLabel: string = LabelCommon.RECYCLED_FURNITURE

  /* not recycled furniture label */
  notRecycledFurnitureLabel: string = LabelCommon.NOT_RECYCLED_FURNITURE;

  /* web show label */
  webShowLabel: string = LabelCommon.WEB_SHOW;

  /* web disable label */
  webDisable: string = LabelCommon.WEB_DISABLE;

  /* search field form group */
  searchProductCategoryForm: FormGroup;

  /* Product rank dropdown Data  */
  dropdownListProductRanks: DropdownListData[] = [];

  /* curent page */
  pageSize = MasterCommon.PAGE_SIZE;

  /* curent page */
  curentPage = 1;

  /* total record */
  totalRecord = 0;

  /* refer pagination */
  @ViewChild('paginator', { static: true }) paginator: Paginator

  /* position alert popup*/
  position: string;

  /* key search*/
  keySearch: any;

  columns: any = [];

  /* product categories */
  productCategoryList: ProductCategoryListResponse[] = [];

  /* confirm ok text */
  public confirmYes: string = MasterCommon.CONFIRM_YES;

  /* place holder text */
  public confirmNo: string = MasterCommon.CONFIRM_NO;

  /* current */
  Yen: string = LabelCommon.Y;

  /* form search */
  searchForm: any = {};

  constructor(private router: Router,
    private dropdownListService: DropdownListService,
    private productCategoryService: ProductCategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.searchProductCategoryForm = new FormGroup({
      categoryName: new FormControl(""),
      productRankId: new FormControl(),
      recoverableFlag: new FormControl(""),
      webDispFlag: new FormControl("")
    });
    this.keySearch = this.tokenStorageService.getCacheSearch(
      ProductCategoryListComponent.name
    );
    if (this.keySearch) {
      this.searchProductCategoryForm.patchValue({
        categoryName: this.keySearch.categoryName,
        productRankId: this.keySearch.productRankId,
        recoverableFlag: this.keySearch.recoverableFlag !== undefined ? this.keySearch.recoverableFlag == "true" ? "true" : "false" : undefined,
        webDispFlag: this.keySearch.webDispFlag !== undefined ? this.keySearch.webDispFlag == "true" ? "true" : "false" : undefined
      });
      this.curentPage = this.keySearch.pageNo;
    }
    this.initHeaderGrid();
    this.dropdownProductRank();
  }
  initHeaderGrid() {
    this.columns = [
      { header: MasterCommon.ID },
      { header: LabelCommon.CATEGORY_NAME },
      { header: LabelCommon.COLLECTION_FEE_NO_TAX },
      { header: LabelCommon.PRODUCT_RANK },
      { header: LabelCommon.SORTING_RECYCLABES },
      { header: LabelCommon.WEB_SHOW },
      { header: LabelCommon.KEY_WORD },
      { header: '' },
    ];
    this.dataTable();
  }
  getCategoryName() {
    let filterCategoryName = new Filter();
    let categoryName = this.searchProductCategoryForm.get("categoryName").value;
    if (categoryName !== undefined && categoryName !== "" && categoryName !== null) {
      filterCategoryName.key = PRODUCT_CATEGORY.CATETGORY_NAME.toString();
      filterCategoryName.values = categoryName;
      this.searchForm['categoryName'] = categoryName;
      return filterCategoryName;
    }
    return null;
  }
  getProductRankId() {
    let filterProductRankId = new Filter();
    let productRankId = this.searchProductCategoryForm.get("productRankId").value;
    if (productRankId !== undefined && productRankId !== "" && productRankId !== null) {
      filterProductRankId.key = PRODUCT_CATEGORY.PRODUCT_RANK_ID.toString();
      filterProductRankId.values = productRankId;
      this.searchForm['productRankId'] = productRankId;
      return filterProductRankId;
    }
    return null;
  }
  getRecoverableFlag() {
    let filterRecoverableFlag = new Filter();
    let recoverableFlag = this.searchProductCategoryForm.get("recoverableFlag").value;
    if (recoverableFlag !== undefined && recoverableFlag !== "" && recoverableFlag != null) {
      filterRecoverableFlag.key = PRODUCT_CATEGORY.RECOVERABLE_FLAG.toString();
      filterRecoverableFlag.values = recoverableFlag;
      this.searchForm['recoverableFlag'] = recoverableFlag;
      return filterRecoverableFlag;
    }
    return null;
  }
  getWebDispFlag() {
    let filterWebDispFlag = new Filter();
    let webDispFlag = this.searchProductCategoryForm.get("webDispFlag").value;
    if (webDispFlag !== undefined && webDispFlag !== "" && webDispFlag !== null) {
      filterWebDispFlag.key = PRODUCT_CATEGORY.WEB_DISP_FLAG.toString();
      filterWebDispFlag.values = webDispFlag;
      this.searchForm['webDispFlag'] = webDispFlag;
      return filterWebDispFlag;
    }
    return null;
  }
  dataTable() {
    let requestFilter = new RequestFilterDTO();
    requestFilter.filters.push(this.getCategoryName());
    requestFilter.filters.push(this.getProductRankId());
    requestFilter.filters.push(this.getRecoverableFlag());
    requestFilter.filters.push(this.getWebDispFlag());
    requestFilter.pageNo = this.curentPage;
    requestFilter.pageSize = this.pageSize;
    this.searchForm['pageNo'] = this.curentPage;
    this.searchForm['pageSize'] = this.pageSize;
    this.productCategoryService.getSearchProductCategory(requestFilter).subscribe(
      (result) => {
        if (result.status === ConstantsCommon.HTTP_STATUS_200) {
          this.productCategoryList = result.item.items;
          this.totalRecord = result.item.totalItems;
          if (this.keySearch) {
            this.paginator.totalRecords = this.totalRecord;
            this.paginator.changePage(this.curentPage - 1);
          }
        }
      }, (error) => {
        this.productCategoryList = []
      }
    );
  }
  dropdownProductRank() {
    this.dropdownListService.getDropdownlistProductRank().subscribe((result) => {
      this.dropdownListProductRanks = result.item
    }, (error) => {
      this.dropdownListProductRanks = []
    });
  }

  onSearch() {
    this.curentPage = 1;
    this.dataTable();
  }

  registerProductCategory() {
    this.router.navigate(['/ecoland/product-category-edit']);
  }

  detailProductCategoryById(id: number) {
    this.tokenStorageService.saveCacheSearch(
      ProductCategoryListComponent.name, this.searchForm
    );
    this.router.navigate(['/ecoland/product-category-edit', id]);
  }
  confirm(position: string, id: number) {
    this.position = position;
    this.confirmationService.confirm({
      message: MessageValidate.MES_6,
      header: this.titleProductCategory,
      acceptVisible: true,
      rejectVisible: true,
      accept: () => {
        this.deleteProductCategoryById(id);
      },
      key: 'positionDialog'
    });
  }
  deleteProductCategoryById(id: number) {
    this.productCategoryService.deleteProductCategoryById(id).subscribe(
      (result) => {
        if (result.status == ConstantsCommon.HTTP_STATUS_200) {
          this.showSuccessMessage();
        } else if (result.status !== ConstantsCommon.HTTP_STATUS_200) {
          this.showErrorMessage();
        }
        this.dataTable();
      },
      (error) => {
        this.showErrorMessage();
        this.dataTable();
      }
    );
  }
  showErrorMessage() {
    this.messageService.add({
      severity: 'error',
      detail: MessageValidate.MES_7
    });
  }

  showSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      detail: MessageValidate.MES_8
    });
  }
  pageClick(event: any) {
    if (this.keySearch) {
      this.keySearch = this.tokenStorageService.clearCacheSearch(
        ProductCategoryListComponent.name
      );
      return;
    }
    this.curentPage = event.page + 1;
    this.dataTable();
  }
}
