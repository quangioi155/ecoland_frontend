import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import {
  ConstantsCommon,
  eMenu,
  eSystemMenu
} from 'src/app/common/constants.common';
import { LabelCommon, MasterCommon } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { UserGroupsList } from 'src/app/dto/request/user-groups-list-request';
import { UserGroupsListResponse } from 'src/app/dto/response/user-groups-list-response';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserGroupService } from 'src/app/service/user-groups.service';

/**
 * @export class UserGroupListComponent
 *
 * author: thaotv-its
 */
@Component({
  selector: 'app-user-group-list',
  templateUrl: './user-group-list.component.html',
  styleUrls: ['./user-group-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UserGroupListComponent implements OnInit {
  /* screen title */
  public titleUserGroup: string = eSystemMenu.USER_GROUP_MASTER;

  /* label button */
  public searchLabel: string = MasterCommon.SEARCH_LABEL;

  /* label group name */
  public accountNameLabel: string = LabelCommon.GROUP_NAME;

  /* label register user group */
  public registLabel: string = MasterCommon.REGIST_LABEL;

  /* th table */
  columns: any[] = [];

  /* search field form group */
  public searchForm: FormGroup;

  /* obj search user group */
  objSearch: UserGroupsList = new UserGroupsList();

  /* list user groups */
  userGroupList: UserGroupsListResponse[] = [];

  /* confirm ok text */
  public confirmYes: string = MasterCommon.CONFIRM_YES;

  /* place holder text */
  public confirmNo: string = MasterCommon.CONFIRM_NO;

  /* curent page */
  public pageSize = MasterCommon.PAGE_SIZE;

  /* curent page */
  public curentPage = 1;

  /* total record */
  public totalRecord = 0;

  /* refer pagination */
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  /* position alert popup*/
  position: string;

  keySearch: any;

  constructor(
    private userGroupService: UserGroupService,
    private messageService: MessageService,
    private tokenStorageService: TokenStorageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      groupName: new FormControl("")
    });
    this.keySearch = this.tokenStorageService.getCacheSearch(
      UserGroupListComponent.name
    );
    if (this.keySearch) {
      this.searchForm.patchValue({
        groupName: this.keySearch.groupName
      });
      this.curentPage = this.keySearch.pageNo;
    }
    this.initHeaderGrid();
  }
  initHeaderGrid() {
    this.columns = [
      { header: 'ID', width: '5%' },
      { header: LabelCommon.GROUP_NAME, width: '20%' },
      { header: LabelCommon.CONTACT_CUSTOMER_FLAG, width: '10%' },
      { header: eMenu.DRIVER, width: '10%' },
      { header: eMenu.DISPATCH_VERHICLE, width: '10%' },
      { header: eMenu.ZEC, width: '10%' },
      { header: eMenu.MANAGER, width: '10%' },
      { header: eMenu.WAREHOUSE, width: '10%' },
      { header: eMenu.SYSTEM, width: '10%' },
      { header: '', width: '5%' }
    ];
    this.getDataTable();
  }
  getDataTable() {
    this.objSearch.groupName = this.searchForm.get('groupName').value;
    this.objSearch.pageNo = this.curentPage;
    this.objSearch.pageSize = this.pageSize;
    this.userGroupService.getUserGroupsList(this.objSearch).subscribe(
      (result) => {
        if (
          result.status == ConstantsCommon.HTTP_STATUS_200 &&
          result.item.items.length > 0
        ) {
          this.userGroupList = result.item.items;
          this.totalRecord = result.item.totalItems;
          if (this.keySearch) {
            this.paginator.totalRecords = this.totalRecord;
            this.paginator.changePage(this.curentPage - 1);
          }
        } else {
          this.setEmptyData();
        }
      },
      (error) => {
        this.setEmptyData();
      }
    );
    this.tokenStorageService.clearCacheSearch(UserGroupListComponent.name);
  }
  confirm(position: string, id: number) {
    this.position = position;
    this.confirmationService.confirm({
      message: MessageValidate.MES_6,
      header: this.titleUserGroup,
      acceptVisible: true,
      rejectVisible: true,
      accept: () => {
        this.deleteUserGroupById(id);
      },
      key: 'positionDialog'
    });
  }
  deleteUserGroupById(id: number) {
    this.userGroupService.deleteUserGroupById(id).subscribe(
      (result) => {
        if (result.status == ConstantsCommon.HTTP_STATUS_200) {
          this.showSuccessMessage();
        } else if (result.status !== ConstantsCommon.HTTP_STATUS_200) {
          this.showErrorMessage();
        }
        this.getDataTable();
      },
      (error) => {
        this.showErrorMessage();
        this.getDataTable();
      }
    );
  }
  setEmptyData() {
    this.userGroupList = [];
    this.totalRecord = 0;
  }
  pageClick(event: any) {
    if (this.keySearch) {
      this.keySearch = this.tokenStorageService.clearCacheSearch(
        UserGroupListComponent.name
      );
      return;
    }
    this.curentPage = event.page + 1;
    this.getDataTable();
  }
  edit(id: number) {
    this.tokenStorageService.saveCacheSearch(
      UserGroupListComponent.name,
      this.objSearch
    );
    this.router.navigate(['/ecoland/authority-edit', id]);
  }
  registerUserGroup() {
    this.router.navigate(['/ecoland/authority-edit']);
  }
  onSearch() {
    this.curentPage = 1;
    this.getDataTable();
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
}
