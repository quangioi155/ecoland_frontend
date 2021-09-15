
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserAccoutsService } from 'src/app/service/master/user-accounts.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Router } from '@angular/router';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { DropdownListService } from 'src/app/service/dropdownlist.service';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import { MasterCommon, PlaceholderText } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { PaginationRequest } from 'src/app/dto/PaginationRequest';
import { SmallCategoryService } from 'src/app/service/master/small-category.service';

class CategorySmallRequest extends PaginationRequest {
  id: number;
  categoryName: string;

}
@Component({
  selector: 'app-category-small-list',
  templateUrl: './category-small-list.component.html',
  styleUrls: ['./category-small-list.component.scss']
})
export class CategorySmallListComponent implements OnInit {

  /* place holder text */
  public placeholderSelect: string = PlaceholderText.PLACEHOLDER_SELECT;

  /* confirm ok text */
  public confirmYes: string = MasterCommon.CONFIRM_YES;

  /* place holder text */
  public confirmNo: string = MasterCommon.CONFIRM_NO;

  /* screen title */
  public titleName: string = eSystemMenu.WEB_SM_CATG_MASTER;

  public largeCategoryLabel = '大カテゴリ';


  public catagoryNameLabel = 'カテゴリ名';

  /* search label field */
  public searchLabel: string = MasterCommon.SEARCH_LABEL;

  /* search label field */
  public registLabel: string = MasterCommon.REGIST_LABEL;

  /* search field form group */
  public searchForm: FormGroup;

  /* columns grid */
  public columns: any[] = [];

  /* data grid */
  public dataResponse: [];

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

  public currentLoginId: string;

  /* position alert popup*/
  position: string;

  keySearch: any;

  /* object search form*/
  objSearch: CategorySmallRequest = new CategorySmallRequest();

  public dropdownlistLargeCate: DropdownListData[] = [];

  constructor(
    private router: Router,
    private dropdownListService: DropdownListService,
    private userAccoutsService: UserAccoutsService,
    private smallCategoryService: SmallCategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private tokenStorageService: TokenStorageService
  ) { }

  async getLargeCate() {
    let data = await this.dropdownListService.getlistLargeCategory().toPromise();
    if (data.item.length > 0) {
      this.dropdownlistLargeCate = data.item
    }
    else {
      this.dropdownlistLargeCate = data.item
    }
  }

  ngOnInit(): void {
    this.currentLoginId = this.tokenStorageService.getUser().username;
    this.primengConfig.ripple = true;
    this.getLargeCate();
    this.searchForm = new FormGroup({
      id: new FormControl(),
      categoryName: new FormControl(),
    });
    this.keySearch = this.tokenStorageService.getCacheSearch(CategorySmallListComponent.name);
    if (this.keySearch) {
      this.searchForm.setValue({
        id: this.keySearch.id,
        categoryName: this.keySearch.categoryName,
      });
      this.curentPage = this.keySearch.pageNo;
    }
    this.initHeaderGrid();
  }

  initHeaderGrid() {
    this.columns = [
      { header: 'ID' },
      { header: '大カテゴリ' },
      { header: 'カテゴリ名' },
      { header: '' },
    ];
    this.dataGrid();
  }

  dataGrid() {
    this.searchForm.value.pageSize = this.pageSize;
    this.searchForm.value.pageNo = this.curentPage;
    this.objSearch = this.searchForm.value;
    this.smallCategoryService
      .getSmallCategory(this.objSearch)
      .subscribe(
        (data) => {
          if (data.status === ConstantsCommon.HTTP_STATUS_200 && data.item.items.length > 0) {
            this.dataResponse = data.item.items;
            this.totalRecord = data.item.totalItems;
            if (this.keySearch) {
              this.paginator.totalRecords = this.totalRecord;
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
    this.tokenStorageService.clearCacheSearch(CategorySmallListComponent.name);
  }

  confirm(position: string, id: number) {
    this.position = position;
    this.confirmationService.confirm({
      message: MessageValidate.MES_6,
      header: this.titleName,
      acceptVisible: true,
      rejectVisible: true,
      accept: () => {
        this.delete(id);
      },
      key: 'positionDialog',
    });
  }
  delete(id: number) {
    this.smallCategoryService.delete(id).subscribe(
      (result) => {
        if (result.status == ConstantsCommon.HTTP_STATUS_200) {
          this.showSuccess();
        } else {
          this.showError();
        }
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
    this.tokenStorageService.saveCacheSearch(CategorySmallListComponent.name, this.objSearch);
    this.router.navigate(['/ecoland/web_categ2-edit', id]);
  }

  pageClick(event: any) {
    if (this.keySearch) {
      this.keySearch = this.tokenStorageService.clearCacheSearch(CategorySmallListComponent.name);
      return;
    }
    this.curentPage = event.page + 1;
    this.dataGrid();
  }
}
