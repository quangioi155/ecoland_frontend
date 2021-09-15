import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  ConstantsCommon,
  eMenu,
  eSystemMenu
} from 'src/app/common/constants.common';
import { LabelCommon } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { DetailUserGroupResponse } from 'src/app/dto/response/detail-user-group-response';
import { UserGroupService } from 'src/app/service/user-groups.service';

/**
 * @export class UserGroupEditComponent
 *
 * author: thaotv-its
 */
@Component({
  selector: 'app-user-group-edit',
  templateUrl: './user-group-edit.component.html',
  styleUrls: ['./user-group-edit.component.scss'],
  providers: [MessageService]
})
export class UserGroupEditComponent implements OnInit {
  /* validation message */
  public validation = MessageValidate;

  /* screen title */
  public titleUserGroup: string = eSystemMenu.USER_GROUP_MASTER;

  /* label group name */
  public accountNameLabel: string = LabelCommon.GROUP_NAME;

  /* label role name */
  public labelRole: string = LabelCommon.LABEL_CHECKBOX_ROLE;

  /* label role contact customer flag */
  public contact_customer_flag: string = LabelCommon.CONTACT_CUSTOMER_FLAG;

  /* label driver name */
  public driver_label = eMenu.DRIVER;

  /* label vehicle name */
  public vehicleDispatch_label = eMenu.DISPATCH_VERHICLE;

  /* label zec name */
  public zec_label = eMenu.ZEC;

  /* label manager name */
  public manager_label = eMenu.MANAGER;

  /* label ware house name */
  public ware_house_label = eMenu.WAREHOUSE;

  /* label system name */
  public systemLabel = eMenu.SYSTEM;

  /* search field form group */
  public userGroupForm: FormGroup;

  /* columns  */
  columns: any[] = [];

  /* submit button  */
  submitted: boolean;

  /* id record  */
  id: any;

  /* detail user group response  */
  detail: DetailUserGroupResponse = new DetailUserGroupResponse();

  /* value true/false contact customer */
  valueContactCustomerFlag: boolean;

  /* value true/false driver */
  valueDriverFlag: boolean;

  /* value true/false dispath verhicle */
  valueDispathcVehicleFlag: boolean;

  /* value true/false zec */
  valueZecFlag: boolean;

  /* value true/false manager */
  valueManagerFlag: boolean;

  /* value true/false ware house */
  valueWareHouseFlag: boolean;

  /* value true/false system */
  valueSystemFlag: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userGroupService: UserGroupService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    const paramRoute = this.route.snapshot.paramMap.get('id');
    this.id = paramRoute ? paramRoute : '';
    this.userGroupForm = new FormGroup({
      id: new FormControl(),
      groupName: new FormControl('', [Validators.required]),
      contactCustomerFlag: new FormControl(''),
      driverFlag: new FormControl(''),
      vehicleDispatchFlag: new FormControl(''),
      zecFlag: new FormControl(''),
      manageFlag: new FormControl(''),
      warehouseFlag: new FormControl(''),
      systemFlag: new FormControl('')
    });
    if (this.id !== '') {
      this.getDetailUserGroupById();
    }
  }
  getDetailUserGroupById() {
    this.userGroupService.detailUserGroupById(this.id).subscribe(
      (result) => {
        this.detail = result.item;
        this.setValueInGroupForm();
      },
      (error) => { }
    );
  }

  setValueInGroupForm() {
    this.userGroupForm.patchValue({
      id: this.detail.id,
      groupName: this.detail.groupName,
      contactCustomerFlag: this.detail.contactCustomerFlag,
      driverFlag: this.detail.driverFlag,
      vehicleDispatchFlag: this.detail.vehicleDispatchFlag,
      zecFlag: this.detail.zecFlag,
      manageFlag: this.detail.manageFlag,
      warehouseFlag: this.detail.warehouseFlag,
      systemFlag: this.detail.systemFlag
    });
  }
  get f() {
    return this.userGroupForm.controls;
  }
  editOrCreateUserGroups() {
    this.submitted = true;
    if (this.userGroupForm.invalid) {
      return;
    }
    this.setObject();
    this.userGroupService
      .createOrUpdateUserGroup(this.userGroupForm.value)
      .subscribe(
        (result) => {
          if (result.status === ConstantsCommon.HTTP_STATUS_200) {
            this.messageService.add({
              severity: 'success',
              detail: MessageValidate.MES_8
            });
            setTimeout(() => {
              this.router.navigate(['/ecoland/authority-list']);
            }, 500);
          } else if (result.status === ConstantsCommon.HTTP_STATUS_403) {
            this.showError(MessageValidate.MES_11);
          } else {
            this.showError(MessageValidate.MES_10);
          }
        },
        (error) => {
          this.showError(MessageValidate.MES_10);
        }
      );
  }

  setObject() {
    this.userGroupForm.patchValue({
      id: this.userGroupForm.get('id').value,
      groupName: this.userGroupForm.get('groupName').value,
      contactCustomerFlag:
        this.userGroupForm.get('contactCustomerFlag').value !== undefined
          ? this.userGroupForm.get('contactCustomerFlag').value
          : false,
      driverFlag:
        this.userGroupForm.get('driverFlag').value !== undefined
          ? this.userGroupForm.get('driverFlag').value
          : false,
      manageFlag:
        this.userGroupForm.get('manageFlag').value !== undefined
          ? this.userGroupForm.get('manageFlag').value
          : false,
      systemFlag:
        this.userGroupForm.get('systemFlag').value !== undefined
          ? this.userGroupForm.get('systemFlag').value
          : false,
      vehicleDispatchFlag:
        this.userGroupForm.get('vehicleDispatchFlag').value !== undefined
          ? this.userGroupForm.get('vehicleDispatchFlag').value
          : false,
      warehouseFlag:
        this.userGroupForm.get('warehouseFlag').value !== undefined
          ? this.userGroupForm.get('warehouseFlag').value
          : false,
      zecFlag:
        this.userGroupForm.get('zecFlag').value !== undefined
          ? this.userGroupForm.get('zecFlag').value
          : false
    });
  }
  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      detail: message
    });
  }
}
