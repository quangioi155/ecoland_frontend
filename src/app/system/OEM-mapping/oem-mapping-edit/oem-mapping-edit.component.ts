import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { eSystemMenu } from 'src/app/common/constants.common';
import { PlaceholderText } from 'src/app/common/label.common';
import { MessageValidate as MES } from 'src/app/common/message-validation';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import { OEMMappingMasters } from 'src/app/dto/oem-mapping-master';
import { DropdownListService } from 'src/app/service/dropdownlist.service';
import { MappingMasterService } from 'src/app/service/master/mapping-master.service';
import { UserAccoutsService } from 'src/app/service/master/user-accounts.service';

/**
 * @export class OEMMappingEditComponent
 *
 * [2-8-20]OEM Mapping edit
 *
 * author: HoanNNC-ITS
 */

@Component({
  selector: 'app-oem-mapping-edit',
  templateUrl: './oem-mapping-edit.component.html',
  styleUrls: ['./oem-mapping-edit.component.scss']
})
export class OemMappingEditComponent implements OnInit {

  /* place holder text */
  public placeholder: string = PlaceholderText.PLACEHOLDER_SELECT_OEM;

  /* screen title */
  public OEMMappingTitle: string = eSystemMenu.OEM_MAPPING_MASTER;

  /* user edit id */
  public id: string = '';

  /* search field form group */
  public userForm: FormGroup;


  /* OEMTypes dropdown Data  */
  public dropdownlistOEMTypes: DropdownListData[] = [];

  /* ProductCategories dropdown data */
  public dropdownlistProductCategories: DropdownListData[] = [];

  /* filteredProductCategories dropdown data */
  public filteredProductCategories: DropdownListData[] = [];

  /* flag submit */
  submitted = false;
  detail: OEMMappingMasters = new OEMMappingMasters()

  constructor(
    private route: ActivatedRoute,
    private dropdownListService: DropdownListService,
    private userAccoutsService: UserAccoutsService,
    private mappingMasterService: MappingMasterService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const paramRoute = this.route.snapshot.queryParams.id;
    this.id = paramRoute ?? '';
    if (this.id != '') {
      this.detailUserAccountsById();
    }
    this.initDropdown();
    this.initForm();
  }
  get f() {
    return this.userForm.controls;
  }
  initForm() {
    this.userForm = new FormGroup({
      id: new FormControl(this.id),
      productCategoryId: new FormControl('', [Validators.required]),
      oemTypeId: new FormControl(''),
      anotherCategoryName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      anotherPickupFee: new FormControl(''),
      anotherWarewhousingFee: new FormControl(''),
      anotherTransactionFee: new FormControl(''),
      oemCategoriesCD: new FormControl(''),
      keywords: new FormControl(''),
    });
  }

  initDropdown() {
    this.getOEMTypes();
    this.getProductCategories();
  }
  async getOEMTypes() {
    let data = await this.dropdownListService.getOEMTypes().toPromise();
    if (data.item.length > 0) {
      this.dropdownlistOEMTypes = data.item
    }
  }
  async getProductCategories() {
    let data = await this.dropdownListService.getProductCategories().toPromise();
    if (data.item.length > 0) {
      this.dropdownlistProductCategories = data.item;
    }
  }
  filterProductCategories(event) {
    let filtered: any[] = [];
    let query = event.query;
    this.dropdownlistProductCategories.map((item: any) => {
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    })
    this.filteredProductCategories = filtered;
  }
  detailUserAccountsById() {
    this.mappingMasterService.detailMappingMatersById(this.id).subscribe((result) => {
      this.detail = result.item
      this.setValue();
    }, (error) => {
      console.log(`🚀 ~ file: oem-mapping-edit.component.ts ~ line 133 ~ OEMMappingEditComponent ~ this.mappingMasterService.detailMappingMatersById ~ error`, error)
    });
  }
  setValue() {
    this.userForm.setValue({
      id: this.detail.id,
      productCategoryId: this.dropdownlistProductCategories.find(item => this.detail.productCategoryId == item.value),
      oemTypeId: this.detail.oemTypeId,
      anotherCategoryName: this.detail.anotherCategoryName,
      anotherPickupFee: this.detail.anotherPickupFee,
      anotherWarewhousingFee: this.detail.anotherWarewhousingFee,
      anotherTransactionFee: this.detail.anotherTransactionFee,
      oemCategoriesCD: this.detail.oemCategoriesCD,
      keywords: this.detail.keywords,
    });
  }
  updateOrCreateUser() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    this.userForm.value.productCategoryId = this.userForm.value.productCategoryId?.value
    this.mappingMasterService.createOrUpdateMappingMaters(this.userForm.value).subscribe(
      (data) => {

        if (data.status === "200") {

          this.messageService.add({
            severity: 'success',
            detail: MES.MES_8,
            data
          });
          setTimeout(() => { this.router.navigate(['/ecoland/OEM_mapping-list']) }, 500)
        } else {
          this.showError();
        }
      },
      (err) => {
        this.showError();
      }
    );
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      detail: MES.MES_10,
    });
  }
}
