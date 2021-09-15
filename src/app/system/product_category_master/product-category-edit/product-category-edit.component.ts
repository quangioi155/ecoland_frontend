import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { LabelCommon, MasterCommon, PlaceholderText } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { AutoCompleteResponse } from 'src/app/dto/autocomplete';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import { CreateOrEditProductCategoryRequest } from 'src/app/dto/request/create-edit-product-category.request';
import { DetailProductCategoryResponse } from 'src/app/dto/response/detail-product-category-response';
import { AutoCompleteService } from 'src/app/service/autocomplete.service';
import { DropdownListService } from 'src/app/service/dropdownlist.service';
import { ProductCategoryService } from 'src/app/service/master/product-category.service';

@Component({
  selector: 'app-product-category-edit',
  templateUrl: './product-category-edit.component.html',
  styleUrls: ['./product-category-edit.component.scss'],
  providers: [MessageService]
})
export class ProductCategoryEditComponent implements OnInit {
  /* screen title */
  titleProductCategory: string = eSystemMenu.PRODUCT_CATG_MASTER;

  /* categoryname label */
  categoryNameLabel: string = LabelCommon.CATEGORY_NAME;

  /* product rank label */
  productRankLabel: string = LabelCommon.PRODUCT_RANK;

  /* placeholder select */
  placeholderSelect: string = PlaceholderText.PLACEHOLDER_SELECT;

  /* register label */
  registLabel: string = MasterCommon.REGIST_LABEL;

  /* search label */
  searchLabel: string = MasterCommon.SEARCH_LABEL;

  /* collection fee no tax label */
  collectionFeeNoTaxLabel: string = LabelCommon.COLLECTION_FEE_NO_TAX

  /* preserved fee no tax label */
  preservedFeeNoTaxLabel: string = LabelCommon.PRESERVED_FEE_NO_TAX;

  /* import export fee no tax label */
  importExportFeeNoTax: string = LabelCommon.IMPORT_EXPORT_FEE_NO_TAX;

  /* sorting recyclabes label */
  sortingRecyclabesLabel: string = LabelCommon.SORTING_RECYCLABES;

  /* keyword label */
  keyWordLabel: string = LabelCommon.KEY_WORD;

  /* web show label */
  webShowLabel: string = LabelCommon.WEB_SHOW;

  /* webdisable label */
  webDisable: string = LabelCommon.WEB_DISABLE;

  /* web id label */
  webID: string = LabelCommon.WEB_ID;

  /* image path label */
  imgPathLabel: string = LabelCommon.IMG_PATH;

  /* recycleFurniture label */
  recycledFurnitureLabel: string = LabelCommon.RECYCLED_FURNITURE;

  /* not recycle Furniture label */
  notRecycledFurnitureLabel: string = LabelCommon.NOT_RECYCLED_FURNITURE;

  /* current label */
  Yen: string = LabelCommon.Y;

  /* management out label */
  managementOutLabel: string = LabelCommon.MANAGEMENT_OUT;

  /* is not management out label */
  isNotManagementOutLabel: string = LabelCommon.Is_NOT_MANAGEMENT_OUT;

  /* search field form group */
  productCategoryForm: FormGroup;

  id: any;

  /* select recoverable */
  selectedRecoverableFlag: any

  /* autocomplete  */
  autoCompleteResponse: AutoCompleteResponse[]

  /* filter category name array */
  filteredCategoryName: any[];

  /* submmitt form */
  submitted: boolean = false;

  /* message validate */
  public validation = MessageValidate;

  /* detail product category response */
  detailProductCategoryResponse: DetailProductCategoryResponse = new DetailProductCategoryResponse;

  /* create or edit product categroy request*/
  createOrEditProductCategoryRequest: CreateOrEditProductCategoryRequest = new CreateOrEditProductCategoryRequest()

  /* Product rank dropdown Data  */
  dropdownListProductRanks: DropdownListData[] = [];

  /* web samll category id */
  webSmallCategoryId: any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private autoCompleteService: AutoCompleteService,
    private dropdownListService: DropdownListService,
    private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    const paramRoute = this.route.snapshot.paramMap.get('id');
    this.id = paramRoute ? paramRoute : '';
    this.setFormProductCategory();
    this.autoCompletes();
    this.dropdownProductRank();
    if (this.id !== '') {
      this.detailProductCategoryById();
    }
  }

  autoCompletes() {
    this.autoCompleteService.getAutoComplete().subscribe((result) => {
      if (result.status === ConstantsCommon.HTTP_STATUS_200) {
        this.autoCompleteResponse = result.item;
      }
    });
  }
  filterCategoryName(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.autoCompleteResponse.length; i++) {
      let categoryname = this.autoCompleteResponse[i];
      if (categoryname.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        filtered.push(categoryname);
      }
    }
    this.filteredCategoryName = filtered;
  }
  get f() {
    return this.productCategoryForm.controls;
  }
  setFormProductCategory() {
    this.productCategoryForm = new FormGroup({
      id: new FormControl(),
      categoryName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      pickupFeeNoTax: new FormControl(0, [Validators.required, Validators.pattern("^[0-9]*$")]),
      wareHousingFeeNoTax: new FormControl(0, [Validators.required, Validators.pattern("^[0-9]*$")]),
      wareHousingTransactionFee: new FormControl(0, [Validators.required, Validators.pattern("^[0-9]*$")]),
      standardRankId: new FormControl(''),
      recoverableFlag: new FormControl('', [Validators.required]),
      keywords: new FormControl('', [Validators.required]),
      webDispFlag: new FormControl('', [Validators.required]),
      webSmallCategoryId: new FormControl(''),
      imgFilePath: new FormControl(''),
      managementOut: new FormControl('', [Validators.required])
    });
  }
  setWebSmallCategory() {
    for (let i = 0; i < this.autoCompleteResponse.length; i++) {
      let categoryname = this.autoCompleteResponse[i];
      if (categoryname.id === this.detailProductCategoryResponse.webSmallCategoryId) {
        this.webSmallCategoryId = categoryname;
        this.createOrEditProductCategoryRequest.webSmallCategoryId = categoryname.id;
      }
    }
  }
  setValueFormProductCategory() {
    this.productCategoryForm.patchValue({
      id: this.id,
      categoryName: this.detailProductCategoryResponse.categoryName,
      pickupFeeNoTax: this.detailProductCategoryResponse.pickupFeeNoTax,
      wareHousingFeeNoTax: this.detailProductCategoryResponse.warewhousingFeeNoTax,
      wareHousingTransactionFee: this.detailProductCategoryResponse.warehousingTransactionFee,
      standardRankId: this.detailProductCategoryResponse.standardRankId,
      recoverableFlag: this.detailProductCategoryResponse.recoverableFlag ? "true" : "false",
      keywords: this.detailProductCategoryResponse.keywords,
      webDispFlag: this.detailProductCategoryResponse.webDispFlag ? "true" : "false",
      webSmallCategoryId: this.detailProductCategoryResponse.webSmallCategoryId,
      imgFilePath: this.detailProductCategoryResponse.imgFilePath,
      managementOut: this.detailProductCategoryResponse.managementOut ? "true" : "false"
    });
  }
  dropdownProductRank() {
    this.dropdownListService.getDropdownlistProductRank().subscribe((result) => {
      this.dropdownListProductRanks = result.item
    }, (error) => {
      this.dropdownListProductRanks = []
    });
  }
  detailProductCategoryById() {
    this.productCategoryService.detaiProductCategoryById(this.id).subscribe((result) => {
      if (result.status === ConstantsCommon.HTTP_STATUS_200) {
        this.detailProductCategoryResponse = result.item;
        this.setValueFormProductCategory();
        this.setWebSmallCategory();
      }
    }, (error) => { });
  }
  onSelect(event) {
    this.createOrEditProductCategoryRequest.webSmallCategoryId = event.id
  }
  editOrCreateProductCategory() {
    this.submitted = true
    if (this.productCategoryForm.invalid
      || isNaN(Number(this.productCategoryForm.get("pickupFeeNoTax").value))
      || isNaN(Number(this.productCategoryForm.get("wareHousingFeeNoTax").value))
      || isNaN(Number(this.productCategoryForm.get("wareHousingFeeNoTax").value))) {
      return;
    }
    this.getValueProductCategory();
    this.productCategoryService.createOrEditProductCategory(this.createOrEditProductCategoryRequest).subscribe((result) => {
      if (result.status === ConstantsCommon.HTTP_STATUS_200) {
        this.showSuccess();
        setTimeout(() => {
          this.router.navigate(['/ecoland/product-category-list']);
        }, 500);
      } else {
        this.showError();
      }
    }, (error) => {
      this.showError();
    });
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
  getValueProductCategory() {
    this.createOrEditProductCategoryRequest.id = this.id;
    this.createOrEditProductCategoryRequest.categoryName = this.productCategoryForm.get("categoryName").value;
    this.createOrEditProductCategoryRequest.pickupFeeNoTax = this.productCategoryForm.get("pickupFeeNoTax").value;
    this.createOrEditProductCategoryRequest.warewhousingFeeNoTax = this.productCategoryForm.get("wareHousingFeeNoTax").value;
    this.createOrEditProductCategoryRequest.warehousingTransactionFee = this.productCategoryForm.get("wareHousingTransactionFee").value;
    this.createOrEditProductCategoryRequest.standardRankId = this.productCategoryForm.get("standardRankId").value;
    this.createOrEditProductCategoryRequest.recoverableFlag = this.productCategoryForm.get("recoverableFlag").value;
    this.createOrEditProductCategoryRequest.keywords = this.productCategoryForm.get("keywords").value;
    this.createOrEditProductCategoryRequest.webDispFlag = this.productCategoryForm.get("webDispFlag").value;
    this.createOrEditProductCategoryRequest.imgFilePath = this.productCategoryForm.get("imgFilePath").value;
    this.createOrEditProductCategoryRequest.managementOut = this.productCategoryForm.get("managementOut").value;
  }
}
