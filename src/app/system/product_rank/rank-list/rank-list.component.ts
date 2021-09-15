import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { ConstantsCommon } from 'src/app/common/constants.common';
import { MasterCommon, RankLabel } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { ProductRankService } from 'src/app/service/master/product-rank.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

/**
 * @export class RankListComponent
 *
 * [2-8-9]Rank List Screen
 *
 * author: ITSG-HoanNNC
 */
@Component({
  selector: 'app-rank-list',
  templateUrl: './rank-list.component.html',
  styleUrls: ['./rank-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class RankListComponent implements OnInit, AfterViewInit {
  /* screen title */
  public screenTitle: string = RankLabel.TITLE;

  /* confirm ok text */
  public confirmYes: string = MasterCommon.CONFIRM_YES;

  /* place holder text */
  public confirmNo: string = MasterCommon.CONFIRM_NO;

  /* company search label */
  public rankNameField: string = RankLabel.RANK_FIELD;

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
    private rankService: ProductRankService,
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
      this.fillData(this.searchForm);
    }
  }

  ngAfterViewInit(): void {
    if (this.cacheSearch) {
      this.searchForm.patchValue(this.cacheSearch);
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
      rankName: new FormControl(),
      pageSize: new FormControl(this.pageSize),
      pageNo: new FormControl(1)
    });
  }

  initTableHeader() {
    this.columns = [
      { header: 'ID', width: '4%' },
      { header: '商品ランク', width: '28%' },
      { header: 'サイズ', width: '10%' },
      { header: '重量', width: '10%' },
      { header: '税抜き集荷金額', width: '44%' },
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
    this.rankService.searchRank(form.value).subscribe(
      (res) => {
        if (
          res.status === ConstantsCommon.HTTP_STATUS_200 &&
          res.item.totalItems > 0
        ) {
          this.dataProvider = res.item.items;
          this.totalRecord = res.item.totalItems;
        } else if (
          res.status === ConstantsCommon.HTTP_STATUS_200 &&
          res.item.totalItems <= 0
        ) {
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
        this.deleteCompany(id);
      },
      key: 'positionDialog'
    });
  }

  deleteCompany(id: number) {
    const req = {
      id: id
    };

    this.rankService.deleteRank(req).subscribe(
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
      RankListComponent.name,
      this.cacheSearch
    );
    this.router.navigate(['/ecoland/rank-edit', id]);
  }

  getCacheSearch(): any {
    const cache = this.tokenStorageService.getCacheSearch(
      RankListComponent.name
    );
    this.tokenStorageService.clearCacheSearch(RankListComponent.name);
    return cache;
  }
}
