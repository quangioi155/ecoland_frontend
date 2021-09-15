import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { PlaceholderText } from 'src/app/common/label.common';
import { MessageValidate as MES } from 'src/app/common/message-validation';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import { IntroductionService } from 'src/app/service/master/introduction.service';

/**
 * @export class IntroductionListComponent
 *
 * [2-8-22]Introduction Edit Screen
 *
 * author: ITSG-HoanNNC
 */
@Component({
  selector: 'app-introduction-edit',
  templateUrl: './introduction-edit.component.html',
  styleUrls: ['./introduction-edit.component.scss']
})
export class IntroductionEditComponent implements OnInit {
  /* screen title */
  public screenTitle: string = eSystemMenu.PARTNER_COMPANY_MASTER;

  /* place holder text */
  public placeholder: string = PlaceholderText.PLACEHOLDER_SELECT;

  /* form regist/edit */
  public formData: FormGroup;

  /* paytiming data dropdown */
  public payTimingData: DropdownListData[] = [];

  /* payunit data dropdown */
  public payUnitData: DropdownListData[] = [];

  /* discount unit data dropdown */
  public discountUnitData: DropdownListData[] = [];

  /* id for edit */
  public id: number = undefined;

  /* flag submit form */
  public isSubmited: boolean = false;

  /* validation mes */
  public mes: MES = MES;

  /* duplicate error flag */
  public duplicateFlag: boolean = false;

  get f() {
    return this.formData.controls;
  }

  constructor(
    private introductionService: IntroductionService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fillDataDropdown();
    const paramRoute = this.route.snapshot.paramMap.get('id');
    this.id = paramRoute ? parseInt(paramRoute) : null;
    if (this.id) {
      this.setFormData(this.id);
    }
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

  initForm() {
    this.formData = new FormGroup({
      id: new FormControl(),
      introductionName: new FormControl('', [
        Validators.required,
        Validators.maxLength(60)
      ]),
      introductionShortName: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      introductionNameKana: new FormControl('', Validators.maxLength(60)),
      postalCode: new FormControl('', Validators.maxLength(7)),
      address1: new FormControl('', Validators.maxLength(60)),
      address2: new FormControl('', Validators.maxLength(60)),
      address3: new FormControl('', Validators.maxLength(60)),
      tel: new FormControl('', Validators.maxLength(13)),
      fax: new FormControl('', Validators.maxLength(13)),
      payTiming: new FormControl('', Validators.required),
      payUnit: new FormControl('', Validators.required),
      payAmount: new FormControl(0, Validators.pattern('\\d*')),
      payPercent: new FormControl(0.0, Validators.pattern('[0-9.]*')),
      discountUnit: new FormControl('', Validators.required),
      discount: new FormControl(0, Validators.pattern('\\d*')),
      discountPercent: new FormControl(0.0, Validators.pattern('[0-9.]*')),
      sortNo: new FormControl('', Validators.pattern('\\d*'))
    });
  }

  setFormData(id: number) {
    const req = {
      id: id
    };

    this.introductionService.getIntroductionDetail(req).subscribe(
      (res) => {
        if (res.status === ConstantsCommon.HTTP_STATUS_200) {
          this.formData.patchValue(res.item);
        } else {
          this.router.navigate(['ecoland/introduction-list']);
        }
      },
      (err) => {
        this.router.navigate(['ecoland/introduction-list']);
      }
    );
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.formData.invalid) {
      return;
    }
    if (this.id) {
      this.formData.controls['id'].setValue(this.id);
    }

    this.introductionService.updateIntroduction(this.formData.value).subscribe(
      (res) => {
        if (res.status === ConstantsCommon.HTTP_STATUS_200) {
          this.toastSuccess();
          setTimeout(() => {
            this.router.navigate(['ecoland/introduction-list']);
          }, 1500);
        } else if (res.status === ConstantsCommon.HTTP_STATUS_403) {
          this.duplicateFlag = true;
          return;
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
      detail: MES.MES_8
    });
  }

  private toastError() {
    this.messageService.add({
      severity: 'error',
      detail: MES.MES_10
    });
  }

  clearErr() {
    if (this.duplicateFlag) {
      this.duplicateFlag = false;
    }
  }
}
