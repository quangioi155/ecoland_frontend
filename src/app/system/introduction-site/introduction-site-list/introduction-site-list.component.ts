import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { IntroductionLabel, MasterCommon, PlaceholderText } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import { DropdownListService } from 'src/app/service/dropdownlist.service';
import { IntroductionSiteService } from 'src/app/service/master/introduction-site.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-introduction-site-list',
  templateUrl: './introduction-site-list.component.html',
  styleUrls: ['./introduction-site-list.component.scss']
})
export class IntroductionSiteListComponent implements OnInit {

  /* screen title */
  public screenTitle: string = eSystemMenu.PARTNER_COMPANY_LIST;

  /* place holder text */
  public placeholderSelect: string = PlaceholderText.PLACEHOLDER_SELECT;

  /* confirm ok text */
  public confirmYes: string = MasterCommon.CONFIRM_YES;

  /* place holder text */
  public confirmNo: string = MasterCommon.CONFIRM_NO;

  /* introductionName pull down label */
  public introductionNameField: string = IntroductionLabel.INTRODUCTION_NAME;

  /* introductionSiteName search label */
  public insSiteNameField: string = IntroductionLabel.INTRODUCTION_SITE_NAME;

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

  /* introduction data dropdown */
  public pdIntroductionData: DropdownListData[] = [];

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
    private introductionSiteService: IntroductionSiteService,
    private dropdownService: DropdownListService,
    private confirmService: ConfirmationService,
    private messageService: MessageService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fillDataDropdown();
    this.initTableHeader();

    this.cacheSearch = this.getCacheSearch();
    if (!this.cacheSearch) {
      this.fillData(this.searchForm);
    } else {
      this.searchForm.patchValue(this.cacheSearch);
    }
  }

  ngAfterViewInit(): void {
    if (this.cacheSearch) {
      this.fillData(this.searchForm);

      this.flagComeBack = true;
      const pageReSearch = this.searchForm.value.pageNo;
      setTimeout(() => {
        this.paginator.changePage(pageReSearch - 1);
      }, 600);
    }
  }

  initForm() {
    this.searchForm = new FormGroup({
      introductionId: new FormControl(),
      introductionSiteName: new FormControl(),
      pageSize: new FormControl(this.pageSize),
      pageNo: new FormControl(1)
    });
  }

  async fillDataDropdown() {
    let res = await this.dropdownService.getIntroduction().toPromise();
    if (res.status === ConstantsCommon.HTTP_STATUS_200 && res.item.length) {
      this.pdIntroductionData = res.item;
    }
    else {
      this.pdIntroductionData = [];
    }
  }

  initTableHeader() {
    this.columns = [
      { header: 'ID', width: '4%' },
      { header: '提携先企業名', width: '28%' },
      { header: '提携企業拠点', width: '30%' },
      { header: '運営責任者', width: '28%' },
      { header: '表示順序', width: '6%' },
      { header: '', width: '4%' }
    ];
  }

  onSearch(page?: number) {
    let pageNo = 1;

    if (page && page > 1) {
      pageNo = page;
    } else {
      this.flagReSearch = true;
      this.curentPage = 1;
      this.paginator.changePage(0);
    }

    this.searchForm.controls['pageNo'].setValue(pageNo);
    this.fillData(this.searchForm);
  }

  fillData(form: FormGroup) {
    this.introductionSiteService
      .searchIntroductionSite(form.value)
      .subscribe(
        (res) => {
          if (
            res.status === ConstantsCommon.HTTP_STATUS_200 &&
            res.item.totalItems > 0
          ) {
            this.dataProvider = res.item.items;
            this.totalRecord = res.item.totalItems;
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

  confirm(pos: string, id: number) {
    this.position = pos;
    this.confirmService.confirm({
      message: MessageValidate.MES_6,
      header: this.screenTitle,
      acceptVisible: true,
      rejectVisible: true,
      accept: () => {
        this.execDelete(id);
      },
      key: 'positionDialog'
    });
  }

  execDelete(id: number) {
    const req = {
      id: id
    };

    this.introductionSiteService.deleteIntroductionSite(req).subscribe(
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

  gotoEdit(id: number) {
    this.cacheSearch = this.searchForm.value;
    this.tokenStorageService.saveCacheSearch(
      IntroductionSiteListComponent.name,
      this.cacheSearch
    );
    this.router.navigate(['/ecoland/introduction-site-edit', id]);
  }

  getCacheSearch(): any {
    const cache = this.tokenStorageService.getCacheSearch(
      IntroductionSiteListComponent.name
    );
    this.tokenStorageService.clearCacheSearch(IntroductionSiteListComponent.name);
    return cache;
  }

}
