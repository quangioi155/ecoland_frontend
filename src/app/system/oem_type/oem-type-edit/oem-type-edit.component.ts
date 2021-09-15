import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { MessageValidate as MES } from 'src/app/common/message-validation';
import { OemTypeService } from 'src/app/service/master/oem-type.service';

/**
 * @export class OemTypeEditComponent
 *
 * [2-8-18]Oem Type Edit Screen
 *
 * author: ITSG-HoanNNC
 */
@Component({
  selector: 'app-oem-type-edit',
  templateUrl: './oem-type-edit.component.html',
  styleUrls: ['./oem-type-edit.component.scss'],
  providers: [MessageService]
})
export class OemTypeEditComponent implements OnInit {
  /* screen title */
  public screenTitle: string = eSystemMenu.OEM_TYPE_MASTER;

  /* form regist/edit */
  public formData: FormGroup;

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
    private oemTypeService: OemTypeService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    const paramRoute = this.route.snapshot.paramMap.get('id');
    this.id = paramRoute ? parseInt(paramRoute) : null;
    if (this.id) {
      this.setFormData(this.id);
    }
  }

  initForm() {
    this.formData = new FormGroup({
      id: new FormControl(),
      oemName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
      sortNo: new FormControl('', [
        Validators.required,
        Validators.pattern('\\d*')
      ])
    });
  }

  setFormData(id: number) {
    const req = {
      id: id
    };

    this.oemTypeService.getOemTypeDetail(req).subscribe(
      (res) => {
        if (res.status === ConstantsCommon.HTTP_STATUS_200) {
          this.formData.patchValue(res.item);
        } else {
          this.router.navigate(['ecoland/oem-type-list']);
        }
      },
      (err) => {
        this.router.navigate(['ecoland/oem-type-list']);
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

    this.oemTypeService.updateOemType(this.formData.value).subscribe(
      (res) => {
        if (res.status === ConstantsCommon.HTTP_STATUS_200) {
          this.toastSuccess();
          setTimeout(() => {
            this.router.navigate(['ecoland/oem-type-list']);
          }, 500);
        } else if (res.status === ConstantsCommon.HTTP_STATUS_403) {
          this.duplicateFlag = true;
          this.toastError(MES.MES_11);
          return;
        } else {
          this.toastError(MES.MES_10);
        }
      },
      (err) => {
        this.toastError(MES.MES_10);
      }
    );
  }

  private toastSuccess() {
    this.messageService.add({
      severity: 'success',
      detail: MES.MES_8
    });
  }

  private toastError(message: string) {
    this.messageService.add({
      severity: 'error',
      detail: message
    });
  }

  clearErr() {
    if (this.duplicateFlag) {
      this.duplicateFlag = false;
    }
  }
}
