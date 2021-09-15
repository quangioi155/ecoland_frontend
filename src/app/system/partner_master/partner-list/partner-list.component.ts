import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator/public_api';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { LabelCommon, MasterCommon } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { CompanyGroupService } from 'src/app/service/master/company-group.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

/**
 * @export class PartnerListComponent
 *
 * [2-8-5]Partner List Screen
 *
 * author: ITSG-HoanNNC
 */
@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class PartnerListComponent implements OnInit, AfterViewInit {
  /* screen title */
  public companyGroupLabel: string = eSystemMenu.COMPANY_GROUP_MASTER;

  /* confirm ok text */
  public confirmYes: string = MasterCommon.CONFIRM_YES;

  /* place holder text */
  public confirmNo: string = MasterCommon.CONFIRM_NO;

  /* company search label */
  public companyLabel: string = LabelCommon.COMPANY_FIELD;

  /* main label */
  public mainLabel: string = LabelCommon.MAIN_FIELD;

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
    private companyGroupService: CompanyGroupService,
    private confirmService: ConfirmationService,
    private messageService: MessageService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

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
      partnerName: new FormControl(),
      mainFlag: new FormControl(),
      pageSize: new FormControl(50),
      pageNo: new FormControl(1)
    });
  }

  initTableHeader() {
    this.columns = [
      { header: 'ID', width: '4%' },
      { header: '企業名', width: '20%' },
      { header: '郵便番号', width: '10%' },
      { header: '住所', width: '30%' },
      { header: '電話番号', width: '16%' },
      { header: 'FAX番号', width: '16%' },
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
    this.companyGroupService
      .searchCompanyGroup(this.searchForm.value)
      .subscribe(
        (data) => {
          if (
            data.status === ConstantsCommon.HTTP_STATUS_200 &&
            data.item.totalItems > 0
          ) {
            this.dataProvider = data.item.items;
            this.totalRecord = data.item.totalItems;
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
      PartnerListComponent.name
    );
    this.tokenStorageService.clearCacheSearch(PartnerListComponent.name);
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

  gotoEdit(id: number) {
    this.cacheSearch = this.searchForm.value;
    this.tokenStorageService.saveCacheSearch(
      PartnerListComponent.name,
      this.cacheSearch
    );
    this.router.navigate(['/ecoland/partner-edit', id]);
  }

  confirm(pos: string, id: number) {
    this.position = pos;
    this.confirmService.confirm({
      message: MessageValidate.MES_6,
      header: this.companyGroupLabel,
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

    this.companyGroupService.deleteCompanyGroup(req).subscribe(
      (res) => {
        if (res.status === ConstantsCommon.HTTP_STATUS_200) {
          this.toastSuccess();
          this.onSearch(this.curentPage);
        } else {
          this.toastError();
        }
      },
      (err) => {
        this.toastError();
      }
    );
  }

  private toastSuccess() {
    this.messageService.add({
      severity: 'success',
      detail: MessageValidate.MES_8
    });
  }

  private toastError() {
    this.messageService.add({
      severity: 'error',
      detail: MessageValidate.MES_7
    });
  }
}
