import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  SimpleChange,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { UserAccountsListResponse } from 'src/app/dto/response/user-accounts-list-response';
import { UserAccoutsService } from 'src/app/service/master/user-accounts.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { UserAccountsListRequest } from 'src/app/dto/request/user-accounts-list-request';
import { Paginator } from 'primeng/paginator';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Router } from '@angular/router';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { DropdownListService } from 'src/app/service/dropdownlist.service';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import {
  LabelCommon,
  MasterCommon,
  PlaceholderText
} from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';

/**
 * @export class UserMatsterListComponent
 *
 * List user master
 *
 * author: ITSG-HoanNNC
 */
@Component({
  selector: 'app-user-matster-list',
  templateUrl: './user-matster-list.component.html',
  styleUrls: ['./user-matster-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UserMatsterListComponent implements OnInit {
  /* place holder text */
  public placeholderSelect: string = PlaceholderText.PLACEHOLDER_SELECT;

  /* confirm ok text */
  public confirmYes: string = MasterCommon.CONFIRM_YES;

  /* place holder text */
  public confirmNo: string = MasterCommon.CONFIRM_NO;

  /* screen title */
  public userMasterTitle: string = eSystemMenu.USER_MASTER;

  /* partner label field */
  public partnerLabel: string = LabelCommon.PARTNER_FIELD;

  /* partner label field */
  public branchLabel: string = LabelCommon.BRANCH_FIELD;

  /* loginId label field */
  public loginIdLabel: string = LabelCommon.LOGIN_FIELD;

  /* accountName label field */
  public accountNameLabel: string = LabelCommon.ACCOUNT_NAME_FIELD;

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

  public currentLoginId: string;

  /* position alert popup*/
  position: string;

  keySearch: any;

  /* object search form*/
  objSearch: UserAccountsListRequest = new UserAccountsListRequest();

  /* partners dropdown Data  */
  public dropdownlistPartners: DropdownListData[] = [];

  /* branches dropdown data */
  public dropdownlistBranches: DropdownListData[] = [];

  constructor(
    private router: Router,
    private dropdownListService: DropdownListService,
    private userAccoutsService: UserAccoutsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private tokenStorageService: TokenStorageService
  ) { }

  async getPartners() {
    let data = await this.dropdownListService
      .getDropdownlistPartners()
      .toPromise();
    if (data.item.length > 0) {
      this.dropdownlistPartners = data.item;
    } else {
      this.dropdownlistPartners = data.item;
    }
  }
  onChange(id: number) {
    if (id === undefined || id === null) {
      return null;
    }
    this.dropdownListService.getDropdownListBranchesByPartnerId(id).subscribe((result) => {
      this.dropdownlistBranches = result.item;
    }, (error) => {
      this.dropdownlistBranches = [];
    })
  }
  ngOnInit(): void {
    this.currentLoginId = this.tokenStorageService.getUser().username;
    this.primengConfig.ripple = true;
    this.getPartners();
    this.searchForm = new FormGroup({
      partnerId: new FormControl(),
      branchId: new FormControl(),
      loginId: new FormControl(),
      accountName: new FormControl()
    });
    this.keySearch = this.tokenStorageService.getCacheSearch(
      UserMatsterListComponent.name
    );
    if (this.keySearch) {
      this.searchForm.patchValue({
        partnerId: this.keySearch.partnerId,
        branchId: this.keySearch.branchId,
        loginId: this.keySearch.loginId,
        accountName: this.keySearch.accountName
      });
      this.curentPage = this.keySearch.pageNo;
      this.onChange(this.keySearch.partnerId);
    }
    this.initHeaderGrid();
  }

  initHeaderGrid() {
    this.columns = [
      { header: 'ID' },
      { header: '所属企業' },
      { header: '所属拠点' },
      { header: 'ログインID' },
      { header: '名前' },
      { header: '権限' },
      { header: 'メモ' },
      { header: '' }
    ];
    this.dataGrid();
  }

  dataGrid() {
    this.searchForm.value.pageSize = this.pageSize;
    this.searchForm.value.pageNo = this.curentPage;
    this.objSearch = this.searchForm.value;
    this.userAccoutsService.getUserAccountsList(this.objSearch).subscribe(
      (data) => {
        if (
          data.status === ConstantsCommon.HTTP_STATUS_200 &&
          data.item.items.length > 0
        ) {
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
    this.tokenStorageService.clearCacheSearch(UserMatsterListComponent.name);
  }

  confirm(position: string, id: number) {
    this.position = position;
    this.confirmationService.confirm({
      message: MessageValidate.MES_6,
      header: this.userMasterTitle,
      acceptVisible: true,
      rejectVisible: true,
      accept: () => {
        this.deleteLoginId(id);
      },
      key: 'positionDialog'
    });
  }
  deleteLoginId(id: number) {
    this.userAccoutsService.deleteUserAccountById(id).subscribe(
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
      detail: MessageValidate.MES_8
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      detail: MessageValidate.MES_7
    });
  }
  onSearch() {
    this.curentPage = 1;
    this.dataGrid();
  }

  gotoEdit(id: number) {
    this.tokenStorageService.saveCacheSearch(
      UserMatsterListComponent.name,
      this.objSearch
    );
    this.router.navigate(['/ecoland/user-edit', id]);
  }

  pageClick(event: any) {
    if (this.keySearch) {
      this.keySearch = this.tokenStorageService.clearCacheSearch(
        UserMatsterListComponent.name
      );
      return;
    }
    this.curentPage = event.page + 1;
    this.dataGrid();
  }
}
