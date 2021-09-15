import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { PlaceholderText } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { CustomValidator } from 'src/app/common/validator';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import { DropdownListService } from 'src/app/service/dropdownlist.service';
import { SmallCategoryService } from '../../../service/master/small-category.service';

@Component({
  selector: 'app-category-small-edit',
  templateUrl: './category-small-edit.component.html',
  styleUrls: ['./category-small-edit.component.scss'],
  providers: [MessageService],
})
export class CategorySmallEditComponent implements OnInit {

  // validation: Validation = new Validation();

  /* placeholder */
  public placeholder: string = PlaceholderText.PLACEHOLDER_SELECT;

  /* screen title */
  public titleName: string = eSystemMenu.WEB_SM_CATG_MASTER;

  /* id record */
  public id: string = '';

  /* form create or edit */
  public editForm: FormGroup;

  /* dropdown list */
  public dropdownlistLargeCate: DropdownListData[] = [];

  /* flag submit */
  submitted = false;

  /* detail */
  detail: any;

  /* message validate */
  public validation = MessageValidate;

  /* flag already exists */
  categoryName: boolean

  constructor(private route: ActivatedRoute, private dropdownListService: DropdownListService, private smallCategoryService: SmallCategoryService,
    private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    const paramRoute = this.route.snapshot.paramMap.get('id')
    this.id = paramRoute ? String(paramRoute) : '';
    if (this.id !== '') {
      this.detailSmallCategoryById();
    }
    this.initDropdown();
    this.initForm();
  }
  get f() {
    return this.editForm.controls;
  }
  initForm() {
    this.editForm = new FormGroup({
      id: new FormControl(this.id),
      categoryName: new FormControl('', [Validators.required]),
      largeCategoryId: new FormControl('', [Validators.required]),
    });
  }

  initDropdown() {
    this.getDropdownlistLargeCate();
  }
  getDropdownlistLargeCate() {
    this.dropdownListService.getlistLargeCategory().subscribe((result) => {
      this.dropdownlistLargeCate = result.item
    }, (error) => {
      this.dropdownlistLargeCate = []
    });
  }
  detailSmallCategoryById() {
    this.smallCategoryService.detailSmallCategoryById(Number(this.id)).subscribe((result) => {
      this.detail = result.item
      this.setValue();
    }, (error) => {

    });
  }
  setValue() {
    this.editForm.setValue({
      id: this.id,
      largeCategoryId: this.detail.webLargeCategories.id,
      categoryName: this.detail.categoryName,
    });
  }
  createOrUpdateSmallCategory() {
    this.submitted = true;
    this.categoryName = false;
    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    console.log(this.editForm)
    this.smallCategoryService.createOrUpdateSmallCategory(this.editForm.value).subscribe(
      (data) => {
        if (data.status === ConstantsCommon.HTTP_STATUS_200) {
          this.messageService.add({
            severity: 'success',
            detail: MessageValidate.MES_8,
            data
          });
          setTimeout(() => { this.router.navigate(['/ecoland/web_categ2-list']) }, 500)
        } else if (data.status === ConstantsCommon.HTTP_STATUS_403) {
          this.categoryName = true;
          this.setValidatorAlreadyExistsData();
          this.showError(MessageValidate.MES_11);
        } else {
          this.showError(MessageValidate.MES_10);
        }
      },
      (err) => {
        this.showError(MessageValidate.MES_10);
      }
    );
  }
  setValidatorAlreadyExistsData() {
    this.editForm.controls["categoryName"].setValidators([CustomValidator.alreadyExists(this.editForm)]);
    this.editForm.controls["categoryName"].updateValueAndValidity();
  }
  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      detail: message,
    });
  }

}
