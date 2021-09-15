import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConstantsCommon } from 'src/app/common/constants.common';
import { WEBLargeCategoryLabel } from 'src/app/common/label.common';
import { MessageValidate as MES } from 'src/app/common/message-validation';
import { CategoryService } from 'src/app/service/master/category-mater.service';

/**
 * @export class categoryEditComponent
 *
 * [2-8-11]WEB large category edit
 *
 * author: Tien-ITS
 */
@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  /* screen title */
  public WEBLargeCategoryLabel: string = WEBLargeCategoryLabel.TITLE;

  /* form regist/edit */
  public formData: FormGroup;

  /* id for edit */
  public id: number = undefined;

  /* flag submit form */
  public isSubmited: boolean = false;

  /* validation mes */
  public mes: MES = MES;

  public err: string[] = [];

  get f() {
    return this.formData.controls;
  }

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const paramRoute = this.route.snapshot.queryParams.id;
    this.id = paramRoute ? parseInt(paramRoute) : null;
    this.initForm();
    if (this.id) {
      this.setFormData(this.id);
    }
  }

  initForm() {
    this.formData = new FormGroup({
      id: new FormControl(),
      categoryName: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
    });
  }

  setFormData(id: number) {
    const req = {
      id: id
    };

    this.categoryService.getInfoDetail(req).subscribe(
      (res) => {
        if (res.status === ConstantsCommon.HTTP_STATUS_200) {
          this.formData.setValue(res.item);
        } else {
          this.router.navigate(['ecoland/web_categ1-list']);
        }
      },
      (err) => {
        this.router.navigate(['ecoland/web_categ1-list']);
      }
    );
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.formData.invalid) {
      return;
    }
    if (this.id) {
      this.formData.value.id = this.id;
    }

    this.categoryService
      .registOrEditCategoryMater(this.formData.value)
      .subscribe(
        (res) => {
          if (res.status === ConstantsCommon.HTTP_STATUS_200) {
            this.toastSuccess();
            setTimeout(() => {
              this.router.navigate(['ecoland/web_categ1-list']);
            }, 1500);
          } else if (res.status === ConstantsCommon.HTTP_STATUS_403) {
            // todo
            this.err.push(MES.MES_11);
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

  clearErr(event: Event) {
    if (this.err.length) {
      this.err = [];
    }
  }
}
