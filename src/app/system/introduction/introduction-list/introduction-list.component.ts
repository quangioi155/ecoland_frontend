import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { map } from 'rxjs/operators';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import {
  IntroductionLabel,
  LabelCommon,
  MasterCommon,
  PlaceholderText
} from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import { IntroductionService } from 'src/app/service/master/introduction.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

/**
 * @export class IntroductionListComponent
 *
 * [2-8-21]Introduction list Screen
 *
 * author: ITSG-HoanNNC
 */
@Component({
  selector: 'app-introduction-list',
  templateUrl: './introduction-list.component.html',
  styleUrls: ['./introduction-list.component.scss']
})
export class IntroductionListComponent implements OnInit {
  /* screen title */
  public screenTitle: string = eSystemMenu.PARTNER_COMPANY_MASTER;

  /* place holder text */
  public placeholderSelect: string = PlaceholderText.PLACEHOLDER_SELECT;

  /* confirm ok text */
  public confirmYes: string = MasterCommon.CONFIRM_YES;

  /* place holder text */
  public confirmNo: string = MasterCommon.CONFIRM_NO;

  /* introductionName search label */
  public introductionNameField: string = IntroductionLabel.INTRODUCTION_NAME;

  /* introductionName search label */
  public payTimingField: string = IntroductionLabel.PAY_TIMMING;

  /* payUnit search label */
  public payUnitField: string = IntroductionLabel.PAY_UNIT;

  /* discountUnitField search label */
  public discountUnitField: string = IntroductionLabel.DISCOUNT_UNIT;

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

  /* paytiming data dropdown */
  public payTimingData: DropdownListData[] = [];

  /* payunit data dropdown */
  public payUnitData: DropdownListData[] = [];

  /* discount unit data dropdown */
  public discountUnitData: DropdownListData[] = [];

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
    private introductionService: IntroductionService,
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
      introductionName: new FormControl(),
      payTiming: new FormControl(),
      payUnit: new FormControl(),
      discountUnit: new FormControl(),
      pageSize: new FormControl(this.pageSize),
      pageNo: new FormControl(1)
    });
  }

  fillDataDropdown() {
    this.payTimingData = [
      { name: '依頼完了', value: 1 },
      { name: '成約', value: 2 },
      { name: '初回訪問', value: 3 }
    ];
    this.payUnitData = [
      { name: '回あたり', value: 1 },
      { name: '売上額', value: 2 }
    ];
    this.discountUnitData = [
      { name: '割引額', value: 1 },
      { name: '割引率', value: 2 }
    ];
  }

  initTableHeader() {
    this.columns = [
      { header: 'ID', width: '4%' },
      { header: '提携先企業名', width: '26%' },
      { header: '支払発生契機', width: '12%' },
      { header: '支払単位', width: '12%' },
      { header: '支払金額', width: '12%' },
      { header: '割引単位', width: '12%' },
      { header: '割引金額', width: '12%' },
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
    this.introductionService
      .searchIntroduction(form.value)
      .pipe(
        map((res) => {
          res.item.items = res.item.items.map((item) => {
            if (item.payTiming == 1) {
              item.payTiming = '依頼完了';
            } else if (item.payTiming == 2) {
              item.payTiming = '成約';
            } else {
              item.payTiming = '初回訪問';
            }
            item.payUnit == 1
              ? (item.payUnit = '回あたり')
              : (item.payUnit = '売上額');
            item.discountUnit == 1
              ? (item.discountUnit = '割引額')
              : (item.discountUnit = '割引率');

            return item;
          });
          return res;
        })
      )
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

    this.introductionService.deleteIntroduction(req).subscribe(
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
      IntroductionListComponent.name,
      this.cacheSearch
    );
    this.router.navigate(['/ecoland/introduction-edit', id]);
  }

  getCacheSearch(): any {
    const cache = this.tokenStorageService.getCacheSearch(
      IntroductionListComponent.name
    );
    this.tokenStorageService.clearCacheSearch(IntroductionListComponent.name);
    return cache;
  }
}
