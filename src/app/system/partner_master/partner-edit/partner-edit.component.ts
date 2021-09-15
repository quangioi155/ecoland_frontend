import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConstantsCommon } from 'src/app/common/constants.common';
import { CompanyGroupLabel } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { CompanyGroupService } from 'src/app/service/master/company-group.service';

/**
 * @export class PartnerEditComponent
 *
 * [2-8-6]Partner Edit Screen
 *
 * author: ITSG-HoanNNC
 */
@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.scss'],
  providers: [MessageService]
})
export class PartnerEditComponent implements OnInit {
  /* screen title */
  public companyGroupLabel: string = CompanyGroupLabel.TITLE;

  /* form regist/edit */
  public formData: FormGroup;

  /* id for edit */
  public id: number = undefined;

  /* flag submit form */
  public isSubmited: boolean = false;

  /* validation mes */
  public mes = MessageValidate;

  public err: string[] = [];

  public invalidDate = false;

  get f() {
    return this.formData.controls;
  }

  constructor(
    private companyGroupService: CompanyGroupService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const paramRoute = this.route.snapshot.paramMap.get('id');
    this.id = paramRoute ? parseInt(paramRoute) : null;
    this.initForm();
    if (this.id) {
      this.setFormData(this.id);
    }
  }

  initForm() {
    this.formData = new FormGroup({
      id: new FormControl(),
      partnerName: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      address1: new FormControl('', Validators.maxLength(60)),
      address2: new FormControl('', Validators.maxLength(60)),
      address3: new FormControl('', Validators.maxLength(60)),
      postalCode: new FormControl('', [
        Validators.maxLength(7),
        Validators.pattern('[0-9-]*')
      ]),
      tel: new FormControl('', [
        Validators.maxLength(13),
        Validators.pattern('[0-9-]*')
      ]),
      fax: new FormControl('', [
        Validators.maxLength(13),
        Validators.pattern('[0-9-]*')
      ]),
      mailAddress: new FormControl('', [
        Validators.maxLength(60),
        Validators.email
      ]),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(),
      managerName: new FormControl(),
      mainFlag: new FormControl(false)
    });
  }

  setFormData(id: number) {
    const req = {
      id: id
    };

    this.companyGroupService.getInfoDetail(req).subscribe(
      (res) => {
        if (res.status === ConstantsCommon.HTTP_STATUS_200) {
          this.formData.setValue(res.item);
        } else {
          this.router.navigate(['ecoland/partner-list']);
        }
      },
      (err) => {
        this.router.navigate(['ecoland/partner-list']);
      }
    );
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.formData.invalid || this.checkDate()) {
      return;
    }
    if (this.id) {
      this.formData.value.id = this.id;
    }

    this.companyGroupService
      .registOrEditCompanyGroup(this.formData.value)
      .subscribe(
        (res) => {
          if (res.status === ConstantsCommon.HTTP_STATUS_200) {
            this.toastSuccess();
            setTimeout(() => {
              this.router.navigate(['ecoland/partner-list']);
            }, 1500);
          } else if (res.status === ConstantsCommon.HTTP_STATUS_403) {
            // todo
            this.err.push(MessageValidate.MES_11);
            this.toastError();
          } else {
            this.toastError();
          }
        },
        (err) => {
          this.toastError();
        }
      );
  }

  private checkDate(): boolean {
    const startDate = new Date(this.formData.value.startDate);
    const endDate = this.formData.value.endDate ?  new Date(this.formData.value.endDate) : false;

    if (endDate && startDate.getTime() >= endDate.getTime()) {
      this.invalidDate = true;
      return true;
    } else {
      this.invalidDate = false;
      return false;
    }
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
      detail: MessageValidate.MES_10
    });
  }

  clearErr(event: Event) {
    if (this.err.length) {
      this.err = [];
    }
    if (this.invalidDate) {
      this.invalidDate = false;
    }
  }
}
