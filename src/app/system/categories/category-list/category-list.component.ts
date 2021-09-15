import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator/public_api';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { MasterCommon } from 'src/app/common/label.common';
import { CategoryService } from 'src/app/service/master/category-mater.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { MessageValidate as MES } from 'src/app/common/message-validation';


/**
 * @export class CategoryListComponent
 *
 * [2-8-11]WEB large category list
 *
 * author: Tien-ITS
 */
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  /* screen title */
  public WEBLargeCategoryLabel: string = eSystemMenu.WEB_LG_CATG_MASTER;

  /* confirm ok text */
  public confirmYes: string = MasterCommon.CONFIRM_YES;

  /* place holder text */
  public confirmNo: string = MasterCommon.CONFIRM_NO;

  /* company search label */
  public categoryLabel: string = ConstantsCommon.CATG_FIELD;

  /* main label */

  /* button search label */
  public searchLabel: string = MasterCommon.SEARCH_LABEL;

  /* button regist label */
  public registLabel: string = MasterCommon.REGIST_LABEL;

  /* page limit*/
  public pageSize = MasterCommon.PAGE_SIZE;

  /* page link size*/
  public pageLinkSize = MasterCommon.PAGE_LINK_SIZE;

  /* data table */
  public dataProvider: any[];

  /* curent page */
  public curentPage = 1;

  /* total record */
  public totalRecord = 0;

  /* refer pagination */
  @ViewChild('paginator') paginator: Paginator;

  /* column header */
  public columns: any[];

  /* search form */
  public searchForm: FormGroup;

  /* positon dialog popup  */
  public position: string;

  /* flag research  */
  flagReSearch: boolean = false;

  /* flag research  */
  flagComeBack: boolean = false;

  cacheSearch: any;

  constructor(
    private categoryService: CategoryService,
    private confirmService: ConfirmationService,
    private messageService: MessageService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initTableHeader();

    this.cacheSearch = this.getCacheSearch();
    if (!this.cacheSearch) {
      this.initTableData();
    }
  }

  ngAfterViewInit(): void {
    if (this.cacheSearch) {
      this.searchForm.patchValue(this.cacheSearch);
      this.fillDataGrid();
      this.flagComeBack = true;

      const pageReSearch = this.searchForm.value.pageNo;

      setTimeout(() => {
        this.paginator.changePage(pageReSearch - 1);
      }, 600);
    }
  }

  initForm() {
    this.searchForm = new FormGroup({
      categoryName: new FormControl(),
      pageSize: new FormControl(50),
      pageNo: new FormControl(1)
    });
  }

  initTableHeader() {
    this.columns = [
      { header: 'ID', width: '4%' },
      { header: 'カテゴリ名', width: '92%' },
      { header: '', width: '4%' }
    ];
  }

  initTableData() {
    this.searchForm.value.pageSize = this.pageSize;
    this.searchForm.value.pageNo = 1;

    this.fillDataGrid();
  }

  onSearch(page?: number) {
    this.searchForm.value.pageSize = this.pageSize;
    if (!page) {
      // up Flag
      this.flagReSearch = true;
      this.searchForm.value.pageNo = 1;

      // return view page 1
      this.curentPage = 1;
      this.paginator.changePage(0);
    } else {
      this.searchForm.value.pageNo = page;
    }

    this.fillDataGrid();
  }

  fillDataGrid() {
    this.categoryService
      .searchCategoryMater(this.searchForm.value)
      .subscribe(
        (data) => {
          if (data.status === ConstantsCommon.HTTP_STATUS_200 && data.item.totalItems > 0) {
            this.dataProvider = data.item.items;
            this.totalRecord = data.item.totalItems;
          } else if (data.status === ConstantsCommon.HTTP_STATUS_200 && data.item.totalItems <= 0) {
            this.dataProvider = [];
            this.totalRecord = 0;
          } else {
            this.dataProvider = [];
            this.totalRecord = 0;
          }
        },
        (err) => {
          this.dataProvider = [];
          this.totalRecord = 0;
        }
      );
  }

  getCacheSearch(): any {
    const cache = this.tokenStorageService.getCacheSearch(
      CategoryListComponent.name
    );
    this.tokenStorageService.clearCacheSearch(CategoryListComponent.name);
    return cache;
  }

  pageClick(event: any) {
    const page = event.page + 1;
    this.curentPage = page;

    if (this.flagReSearch) {
      this.flagReSearch = false;
      return;
    }
    if (this.flagComeBack) {
      this.flagComeBack = false;
      return;
    }
    this.onSearch(page);
  }

  gotoEdit(data: any) {
    this.cacheSearch = this.searchForm.value;
    this.tokenStorageService.saveCacheSearch(
      CategoryListComponent.name,
      this.cacheSearch
    );
    this.router.navigateByUrl(`/ecoland/web_categ1-edit?id=${data.id}&categoryName=${data.categoryName}`);
  }

  confirm(pos: string, id: number) {
    this.position = pos;
    this.confirmService.confirm({
      message: MES.MES_6,
      header: this.WEBLargeCategoryLabel,
      acceptVisible: true,
      rejectVisible: true,
      accept: () => {
        this.deleteCompany(id);
      },
      key: 'positionDialog'
    });
  }

  deleteCompany(id: number) {
    const req = {
      id: id
    };

    this.categoryService.deleteCategoryMater(req).subscribe((res) => {
      if (res.status === ConstantsCommon.HTTP_STATUS_200) {
        this.showSuccess();
      } else {
        this.showError();
      }
      (err) => {
        this.showError();
      };
    });
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      detail: MES.MES_8
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      detail: MES.MES_7
    });
  }
}
