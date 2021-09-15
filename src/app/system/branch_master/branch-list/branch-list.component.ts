import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { ConstantsCommon, eSystemMenu} from 'src/app/common/constants.common';
import { LabelCommon, MasterCommon, PlaceholderText } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import { SearchBranchRequest } from 'src/app/dto/request/search-branch-request';
import { SearchBranchesResponse } from 'src/app/dto/response/search-branches-response';
import { DropdownListService } from 'src/app/service/dropdownlist.service';
import { BranchesService } from 'src/app/service/master/branches.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

/**
 * @export class BranchListComponent
 *
 * [2-8-7]Branch List Screen
 *
 * author: thaotv-its
 */
@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class BranchListComponent implements OnInit {
  /* title branch */
  titleBranch: string = eSystemMenu.MASTER_BASE;

  /* create search branch form group */
  searchBranchForm: FormGroup;

  /* request search */
  searchBranch: SearchBranchRequest = new SearchBranchRequest();

  /* response branch */
  branchesResponse: SearchBranchesResponse[] = [];

  /* refer pagination */
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  /* label button */
  public searchLabel: string = MasterCommon.SEARCH_LABEL;

  /* label register user group */
  public registLabel: string = MasterCommon.REGIST_LABEL;

  /* label branch name */
  branchName: string = LabelCommon.BRANCH_NAME_TABLE;

  /* label partner */
  partnerLabel: string = LabelCommon.BRANCH_PARTNER;

  /* placeholder */
  placeholderSelect: string = PlaceholderText.PLACEHOLDER_SELECT;

  columns: any = [];

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

  /* position alert popup*/
  position: string;

  keySearch: any;

  customers:any = []
  
  /* partners dropdown Data  */
  public dropdownlistPartners: DropdownListData[] = [];

  constructor(
    private router: Router,
    private branchService: BranchesService,
    private tokenStorageService: TokenStorageService,
    private dropdownListService: DropdownListService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.searchBranchForm = new FormGroup({
      branchName: new FormControl(),
      partnerId: new FormControl()
    });
    this.keySearch = this.tokenStorageService.getCacheSearch(
      BranchListComponent.name
    );
    if (this.keySearch) {
      this.searchBranchForm.patchValue({
        branchName: this.keySearch.branchName,
        partnerId: this.keySearch.partnerId
      });
      this.curentPage = this.keySearch.pageNo;
    }
    this.initHeaderGrid();
    this.getDropDownPartner();
  }

  getDropDownPartner() {
    this.dropdownListService.getDropdownlistPartners().subscribe(
      (result) => {
        this.dropdownlistPartners = result.item;
      },
      (error) => {
        this.dropdownlistPartners = [];
      }
    );
  }
  initHeaderGrid() {
    this.columns = [
      { header: 'ID' },
      { header: LabelCommon.BRANCH_PARTNER },
      { header: LabelCommon.BRANCH_NAME_TABLE },
      { header: LabelCommon.BRANCH_SHORT_NAME },
      { header: LabelCommon.POST_CODE },
      { header: LabelCommon.ADDRESS },
      { header: LabelCommon.INPUT_CORP_SITE },
      { header: LabelCommon.DELIV_CORP_SITTE },
      { header: LabelCommon.TEL },
      { header: LabelCommon.FAX },
      { header: LabelCommon.START_DATE },
      { header: LabelCommon.END_DATE },
      { header: '' }
    ];
    this.getDataTable();
  }
  getDataTable() {
    this.searchBranch.branchName =
      this.searchBranchForm.get('branchName').value;
    this.searchBranch.partnerId = this.searchBranchForm.get('partnerId').value;
    this.searchBranch.pageNo = this.curentPage;
    this.searchBranch.pageSize = this.pageSize;
    this.branchService.getSearchBranch(this.searchBranch).subscribe(
      (result) => {
        if (result.status == ConstantsCommon.HTTP_STATUS_200) {
          this.branchesResponse = result.item.items;
          this.totalRecord = result.item.totalItems;
          if (this.keySearch) {
            this.paginator.totalRecords = this.totalRecord;
            this.paginator.changePage(this.curentPage - 1);
          }
        }
      },
      (error) => {}
    );
  }
  onSearch() {
    this.curentPage = 1;
    this.getDataTable();
  }

  pageClick(event: any) {
    if (this.keySearch) {
      this.keySearch = this.tokenStorageService.clearCacheSearch(
        BranchListComponent.name
      );
      return;
    }
    this.curentPage = event.page + 1;
    this.getDataTable();
  }

  edit(id: number) {
    this.tokenStorageService.saveCacheSearch(
      BranchListComponent.name,
      this.searchBranch
    );
    this.router.navigate(['/ecoland/branch-edit', id]);
  }

  registerBranches() {
    this.router.navigate(['/ecoland/branch-edit']);
  }

  confirm(position: string, id: number) {
    this.position = position;
    this.confirmationService.confirm({
      message: MessageValidate.MES_6,
      header: this.titleBranch,
      acceptVisible: true,
      rejectVisible: true,
      accept: () => {
        this.deleteBranchById(id);
      },
      key: 'positionDialog'
    });
  }
  deleteBranchById(id: number) {
    this.branchService.deleteBranchById(id).subscribe(
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
