import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { PlaceholderText } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import { MasterDetailUserAccounts } from 'src/app/dto/master-user-accounts-detail';
import { DropdownListService } from 'src/app/service/dropdownlist.service';
import { UserAccoutsService } from 'src/app/service/master/user-accounts.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [MessageService]
})
export class UserEditComponent implements OnInit {
  /* validation message */
  public validation = MessageValidate;

  /* place holder text */
  public placeholder: string = PlaceholderText.PLACEHOLDER_SELECT;

  /* screen title */
  public userMasterTitle: string = eSystemMenu.USER_MASTER;

  /* user edit id */
  public id: string = '';

  /* search field form group */
  public userForm: FormGroup;

  /* user group dropdown Data  */
  public dropdownlistUserGroup: DropdownListData[] = [];

  /* partners dropdown Data  */
  public dropdownlistPartners: DropdownListData[] = [];

  /* branches dropdown data */
  public dropdownlistBranches: DropdownListData[] = [];

  /* flag submit */
  submitted = false;

  detail: MasterDetailUserAccounts = new MasterDetailUserAccounts();

  constructor(
    private route: ActivatedRoute,
    private dropdownListService: DropdownListService,
    private userAccoutsService: UserAccoutsService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const paramRoute = this.route.snapshot.paramMap.get('id');
    this.id = paramRoute ? paramRoute : '';
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
      loginId: new FormControl('', [Validators.required]),
      loginPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
      employeeCd: new FormControl(''),
      accountName: new FormControl('', [Validators.required]),
      accountNameKana: new FormControl(''),
      userGroupId: new FormControl('', [Validators.required]),
      partnerId: new FormControl('', [Validators.required]),
      branchId: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });
  }

  initDropdown() {
    this.getDropdownlistUserGroups();
    // this.getDropdownlistBranches();
    this.getDropdownlistPartners();
  }
  getDropdownlistUserGroups() {
    this.dropdownListService.getDropdownlistUserGroups().subscribe(
      (result) => {
        this.dropdownlistUserGroup = result.item;
      },
      (error) => {
        this.dropdownlistUserGroup = [];
      }
    );
  }

  onChange(id: number, flag: any) {
    if (flag === 'web') {
      this.userForm.patchValue({
        branchId: ''
      });
    }
    this.dropdownListService.getDropdownListBranchesByPartnerId(id).subscribe((result) => {
      this.dropdownlistBranches = result.item;
    }, (error) => {
      this.dropdownlistBranches = [];
    })
  }
  getDropdownlistPartners() {
    this.dropdownListService.getDropdownlistPartners().subscribe(
      (result) => {
        this.dropdownlistPartners = result.item;
      },
      (error) => {
        this.dropdownlistPartners = [];
      }
    );
  }
  detailUserAccountsById() {
    this.userAccoutsService.detailUserAccountsById(this.id).subscribe(
      (result) => {
        this.detail = result.item;
        if (this.detail.partnerId !== null && this.detail.partnerId !== undefined) {
          this.onChange(this.detail.partnerId, '');
        }
        this.setValue();
      },
      (error) => { }
    );
  }
  setValue() {
    this.userForm.setValue({
      id: this.detail.id,
      loginId: this.detail.loginId,
      loginPassword: this.detail.loginPassword,
      accountName: this.detail.accountName,
      accountNameKana: this.detail.accountNameKana,
      employeeCd: this.detail.employeeCd,
      description: this.detail.description,
      branchId: this.detail.branchId,
      partnerId: this.detail.partnerId,
      userGroupId: this.detail.userGroupId
    });
  }
  updateOrCreateUser() {
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.userForm)
    if (this.userForm.invalid) {
      return;
    }
    this.userAccoutsService
      .createOrUpdateUserAccounts(this.userForm.value)
      .subscribe(
        (data) => {
          if (data.status === ConstantsCommon.HTTP_STATUS_200) {
            this.messageService.add({
              severity: 'success',
              detail: MessageValidate.MES_8,
              data
            });
            setTimeout(() => {
              this.router.navigate(['/ecoland/user-list']);
            }, 500);
          } else if (data.status === ConstantsCommon.HTTP_STATUS_403) {
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
  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      detail: MessageValidate.MES_10
    });
  }

}
