import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConstantsCommon } from 'src/app/common/constants.common';
import { RankLabel } from 'src/app/common/label.common';
import { MessageValidate as MES } from 'src/app/common/message-validation';
import { ProductRankService } from 'src/app/service/master/product-rank.service';

/**
 * @export class RankEditComponent
 *
 * [2-8-10]Rank Edit Screen
 *
 * author: ITSG-HoanNNC
 */
@Component({
  selector: 'app-rank-edit',
  templateUrl: './rank-edit.component.html',
  styleUrls: ['./rank-edit.component.scss'],
  providers: [MessageService]
})
export class RankEditComponent implements OnInit {
  /* screen title */
  public screenTitle: string = RankLabel.TITLE;

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
    private rankService: ProductRankService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

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
      productRankName: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      size: new FormControl(0, [
        Validators.required,
        Validators.pattern('\\d*')
      ]),
      weight: new FormControl(0, [
        Validators.required,
        Validators.pattern('\\d*')
      ]),
      priceNotax: new FormControl(0, [
        Validators.required,
        Validators.pattern('\\d*')
      ])
    });
  }

  setFormData(id: number) {
    const req = {
      id: id
    };

    this.rankService.getRankDetail(req).subscribe(
      (res) => {
        if (res.status === ConstantsCommon.HTTP_STATUS_200) {
          this.formData.patchValue(res.item);
        } else {
          this.router.navigate(['ecoland/rank-list']);
        }
      },
      (err) => {
        this.router.navigate(['ecoland/rank-list']);
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

    this.rankService.updateRank(this.formData.value).subscribe(
      (res) => {
        if (res.status === ConstantsCommon.HTTP_STATUS_200) {
          this.toastSuccess();
          setTimeout(() => {
            this.router.navigate(['ecoland/rank-list']);
          }, 1500);
        } else if (res.status == ConstantsCommon.HTTP_STATUS_403) {
          this.duplicateFlag = true;
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
