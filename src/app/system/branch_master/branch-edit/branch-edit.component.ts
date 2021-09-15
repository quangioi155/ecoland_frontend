import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { LabelCommon, PlaceholderText } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import { DetailBranchesResponse } from 'src/app/dto/response/detail-branch-response';
import { DropdownListService } from 'src/app/service/dropdownlist.service';
import { BranchesService } from 'src/app/service/master/branches.service';

/**
 * @export class BranchEditComponent
 *
 * [2-8-8]Branch Edit Screen
 *
 * author: thaotv-its
 */
@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.scss'],
  providers: [MessageService]
})
export class BranchEditComponent implements OnInit {
  /* validation message */
  // validation: MessageValidate;

  /* screen title */
  public titleBranch: string = eSystemMenu.MASTER_BASE;

  /* submmitt form */
  submitted: boolean = false;

  /* label partner */
  partnerLabel: string = LabelCommon.PARTNER_FIELD;

  /* label branch name */
  branchNameLabel: string = LabelCommon.BRANCH_NAME_TABLE;

  /* label branch short name */
  branchShortNameLabel: string = LabelCommon.BRANCH_SHORT_NAME;

  /* label post code */
  postCodeLabel: string = LabelCommon.POST_CODE;

  /* label address1 */
  addressLabel1: string = LabelCommon.ADDRESS1;

  /* label address2 */
  addressLabel2: string = LabelCommon.ADDRESS2;

  /* label address3 */
  addressLabel3: string = LabelCommon.ADDRESS3;

  /* label tel */
  telLabel: string = LabelCommon.TEL;

  /* label fax */
  faxLabel: string = LabelCommon.FAX;

  /* label start date */
  startDateLabel: string = LabelCommon.START_DATE;

  /* label end date */
  endDateLabel: string = LabelCommon.END_DATE;

  /* label input corp site */
  inputCorpSiteLabel: string = LabelCommon.INPUT_CORP_SITE;

  /* label deliv corp site */
  delivCorpSiteLabel: string = LabelCommon.DELIV_CORP_SITTE;

  /* label deliv corp site */
  branchCodeLabel:string = LabelCommon.BRANCH_CODE;

  /* label placeholder */
  placeholderSelect: string = PlaceholderText.PLACEHOLDER_SELECT;

  /* id record  */
  id: any;

  /* branch form group */
  branchForm: FormGroup;

  /* detail response */
  detail: DetailBranchesResponse = new DetailBranchesResponse();

  /* partners dropdown Data  */
  public dropdownlistPartners: DropdownListData[] = [];

  public validation = MessageValidate;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private brachService: BranchesService,
    private dropdownListService: DropdownListService
  ) { }

  ngOnInit(): void {
    const paramRoute = this.route.snapshot.paramMap.get('id');
    this.id = paramRoute ? paramRoute : '';
    this.setBranchFormGroup();
    this.getDropDownPartner();
    if (this.id != '') {
      this.detailBranchById();
    }
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
  get f() {
    return this.branchForm.controls;
  }
  setBranchFormGroup() {
    this.branchForm = new FormGroup({
      id: new FormControl(),
      partnerId: new FormControl('', [Validators.required]),
      branchName: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      branchShortName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
      postalCode: new FormControl("", [Validators.maxLength(7)]),
      address1: new FormControl("", [Validators.maxLength(60)]),
      address2: new FormControl("", [Validators.maxLength(60)]),
      address3: new FormControl("", [Validators.maxLength(60)]),
      tel: new FormControl("", [Validators.maxLength(13)]),
      fax: new FormControl("", [Validators.maxLength(13)]),
      startDate: new FormControl(""),
      endDate: new FormControl(""),
      inputCorpSite: new FormControl(""),
      delivCorpSite: new FormControl(""),
      branhCode: new FormControl("")
    });
  }

  setValueBranchForm() {
    this.branchForm.patchValue({
      id: this.detail.id,
      partnerId: this.detail.partnerId,
      branchName: this.detail.branchName,
      branchShortName: this.detail.branchShortName,
      postalCode: this.detail.postalCode,
      address1: this.detail.address1,
      address2: this.detail.address2,
      address3: this.detail.address3,
      tel: this.detail.tel,
      fax: this.detail.fax,
      startDate:
        this.detail.startDate != null ? new Date(this.detail.startDate) : '',
      endDate: this.detail.endDate != null ? new Date(this.detail.endDate) : '',
      inputCorpSite: this.detail.inputCorpSite,
      delivCorpSite: this.detail.delivCorpSite,
      branhCode:this.detail.branchCode
    });
  }
  detailBranchById() {
    this.brachService.detaiBranchById(this.id).subscribe(
      (result) => {
        if (result.status == ConstantsCommon.HTTP_STATUS_200) {
          this.detail = result.item;
          this.setValueBranchForm();
        }
      },
      (error) => { }
    );
  }
  registerOrEditBranch() {
    this.submitted = true;
    if (this.branchForm.invalid) {
      return;
    }
    this.brachService.createOrUpdateBranch(this.branchForm.value).subscribe(
      (result) => {
        if (result.status === ConstantsCommon.HTTP_STATUS_200) {
          this.showSuccess();
          setTimeout(() => {
            this.router.navigate(['/ecoland/branch-list']);
          }, 500);
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
      detail: MessageValidate.MES_8
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      detail: MessageValidate.MES_10
    });
  }
}
