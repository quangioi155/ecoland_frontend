import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { UserAccountsListResponse } from 'src/app/dto/response/user-accounts-list-response';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { UserAccountsListRequest } from 'src/app/dto/request/user-accounts-list-request';
import { Paginator } from 'primeng/paginator';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Router } from '@angular/router';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { DropdownListService } from 'src/app/service/dropdownlist.service';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import { MappingMasterService } from 'src/app/service/master/mapping-master.service';
import { MasterCommon, PlaceholderText } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';

/**
 * @export class OEMMappingListComponent
 *
 * [2-8-19]OEM Mapping List
 *
 * @author: HoanNNC-ITS
 */

@Component({
  selector: 'app-oem-mapping-list',
  templateUrl: './oem-mapping-list.component.html',
  styleUrls: ['./oem-mapping-list.component.scss']
})
export class OemMappingListComponent implements OnInit {

  /* place holder text */
  public placeholderSelect: string = PlaceholderText.PLACEHOLDER_SELECT_OEM;

  /* confirm ok text */
  public confirmYes: string = MasterCommon.CONFIRM_YES;

  /* place holder text */
  public confirmNo: string = MasterCommon.CONFIRM_NO;

  /* screen title */
  public OEMMappingTitle: string = eSystemMenu.OEM_MAPPING_MASTER;

  /* Productcategorie label field */
  public ProductcategorieLabel: string = ConstantsCommon.PRODUCT_CATG;

  /* OEMType label field */
  public OEMTypeLabel: string = ConstantsCommon.OEM_TYPE;

  /* OEM category label field */
  public OEMCategoryLabel: string = ConstantsCommon.OEM_CATG;

  /* OEM category CD label field */
  public OEMCategoryCDLabel: string = ConstantsCommon.OEM_CATG_CD;

  /* search label field */
  public searchLabel: string = MasterCommon.SEARCH_LABEL;

  /* search label field */
  public registLabel: string = MasterCommon.REGIST_LABEL;

  /* search field form group */
  public searchForm: FormGroup;

  /* columns grid */
  public columns: any[] = [];

  /* data grid */
  public dataResponse: UserAccountsListResponse[] = [];

  /* page limit*/
  public pageSize = MasterCommon.PAGE_SIZE;

  /* curent page */
  public curentPage = 1;

  /* total record */
  public totalRecord = 0;

  /* page link size*/
  public pageLinkSize = MasterCommon.PAGE_LINK_SIZE;

  public cacheSearch: any;

  /* refer pagination */
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  public currentOEMCategory: string;

  /* position alert popup*/
  position: string;

  keySearch: any;

  /* object search form*/
  objSearch: UserAccountsListRequest = new UserAccountsListRequest();

  /* OEMTypes dropdown Data  */
  public dropdownlistOEMTypes: DropdownListData[] = [];

  /* ProductCategories dropdown data */
  public dropdownlistProductCategories: DropdownListData[] = [];

  constructor(
    private router: Router,
    private dropdownListService: DropdownListService,
    private mappingMasterService: MappingMasterService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private tokenStorageService: TokenStorageService
  ) { }

  async getOEMTypes() {
    let data = await this.dropdownListService.getOEMTypes().toPromise();
    if (data.item.length > 0) {
      this.dropdownlistOEMTypes = data.item
    }
  }
  async getProductCategories() {
    let data = await this.dropdownListService.getProductCategories().toPromise();
    if (data.item.length > 0) {
      this.dropdownlistProductCategories = data.item;
    }
  }
  ngOnInit(): void {
    this.currentOEMCategory = this.tokenStorageService.getUser().username;
    this.primengConfig.ripple = true;
    this.getOEMTypes();
    this.getProductCategories();
    this.searchForm = new FormGroup({
      productCategoryId: new FormControl(),
      oemTypeId: new FormControl(),
      anotherCategoryName: new FormControl(null),
      anotherPickupFee: new FormControl()
    });
    this.keySearch = this.tokenStorageService.getCacheSearch(OemMappingListComponent.name);
    if (this.keySearch) {
      this.searchForm.setValue({
        productCategoryId: this.keySearch.productCategoryId,
        oemTypeId: this.keySearch.oemTypeId,
        anotherCategoryName: this.keySearch.anotherCategoryName,
        anotherPickupFee: this.keySearch.anotherPickupFee
      });
      this.curentPage = this.keySearch.pageNo;
    }
    this.initHeaderGrid();
  }

  initHeaderGrid() {
    this.columns = [
      { header: 'ID', width: '4%' },
      { header: '商品カテゴリ', width: '20%' },
      { header: 'OEMタイプ', width: '10%' },
      { header: 'OEMカテゴリ', width: '20%' },
      { header: '回収料金(税抜)', width: '10%' },
      { header: 'OEMカテゴリCD', width: '9%' },
      { header: 'キーワード', width: '20%' },
      { header: '', width: '4%' },
    ];
    this.dataGrid();
  }

  dataGrid() {
    this.searchForm.value.productCategoryId = this.searchForm.value.productCategoryId?.value ?? null;
    this.searchForm.value.anotherCategoryName = this.searchForm.value.anotherCategoryName != "" ? this.searchForm.value.anotherCategoryName : null;
    this.searchForm.value.pageSize = this.pageSize;
    this.searchForm.value.pageNo = this.curentPage;

    this.objSearch = this.searchForm.value;
    this.mappingMasterService
      .getMappingMatersList(this.objSearch)
      .subscribe(
        (data) => {
          if (data.status === ConstantsCommon.HTTP_STATUS_200 && data.item.items.length > 0) {
            this.dataResponse = data.item.items;
            this.totalRecord = data.item.totalItems;
            if (this.keySearch) {
              this.paginator.totalRecords = this.totalRecord
              this.paginator.changePage(this.curentPage - 1);
            }
          } else {
            this.dataResponse = [];
            this.totalRecord = 0;
          }
        },
        (error) => {
          this.dataResponse = [];
          this.totalRecord = 0;
        }
      );
    this.tokenStorageService.clearCacheSearch(OemMappingListComponent.name);
  }

  confirm(position: string, id: number) {
    this.position = position;
    this.confirmationService.confirm({
      message: MessageValidate.MES_6,
      header: this.OEMMappingTitle,
      acceptVisible: true,
      rejectVisible: true,
      accept: () => {
        this.deleteOEMCategory(id);
      },
      key: 'positionDialog',
    });
  }
  deleteOEMCategory(id: number) {
    this.mappingMasterService.deleteMappingMaterById(id).subscribe(
      (result) => {
        if (result.status == ConstantsCommon.HTTP_STATUS_200) {
          this.showSuccess();
        } else {
          this.showError();
        }
        this.dataGrid();
      },
      (error) => {
        this.showError();
      }
    );
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      detail: MessageValidate.MES_8,
    });

  }
  showError() {
    this.messageService.add({
      severity: 'error',
      detail: MessageValidate.MES_7,
    });
  }
  onSearch() {
    this.curentPage = 1;
    this.dataGrid();
  }

  gotoEdit(id: number) {
    this.tokenStorageService.saveCacheSearch(OemMappingListComponent.name, this.objSearch);
    this.router.navigateByUrl(`/ecoland/OEM_mapping-edit?id=${id}`);
  }

  pageClick(event: any) {
    if (this.keySearch) {
      this.keySearch = this.tokenStorageService.clearCacheSearch(OemMappingListComponent.name);
      return;
    }
    this.curentPage = event.page + 1;
    this.dataGrid();
  }
}
