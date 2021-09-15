import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantsCommon, eSystemMenu } from 'src/app/common/constants.common';
import { PlaceholderText } from 'src/app/common/label.common';
import { DropdownListData } from 'src/app/dto/dropdownlist';
import { MessageValidate as MES } from 'src/app/common/message-validation';
import { IntroductionSiteService } from 'src/app/service/master/introduction-site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DropdownListService } from 'src/app/service/dropdownlist.service';

@Component({
  selector: 'app-introduction-site-edit',
  templateUrl: './introduction-site-edit.component.html',
  styleUrls: ['./introduction-site-edit.component.scss']
})
export class IntroductionSiteEditComponent implements OnInit {

  /* screen title */
  public screenTitle: string = eSystemMenu.PARTNER_COMPANY_MASTER;

  /* place holder text */
  public placeholder: string = PlaceholderText.PLACEHOLDER_SELECT;

  /* form regist/edit */
  public formData: FormGroup;

  /* pulldown data introduction site */
  public pdIntroductionData: DropdownListData[] = [];

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
    private introductionSiteService: IntroductionSiteService,
    private dropdownService: DropdownListService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fillDataDropdown();
    const paramRoute = this.route.snapshot.paramMap.get('id');
    this.id = paramRoute ? parseInt(paramRoute) : null;
    if (this.id) {
      this.setFormData(this.id);
    }
  }

  async fillDataDropdown() {
    let res = await this.dropdownService.getIntroduction().toPromise();
    if (res.status === ConstantsCommon.HTTP_STATUS_200 && res.item.length) {
      this.pdIntroductionData = res.item;
    }
    else {
      this.pdIntroductionData = [];
    }
  }

  initForm() {
    this.formData = new FormGroup({
      introductionSiteId: new FormControl(),
      introductionId: new FormControl(undefined, Validators.required),
      introductionSiteName: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      introductionSiteNameKana: new FormControl('', Validators.maxLength(30)),
      introductionSiteManager: new FormControl('', Validators.maxLength(60)),
      sortNo: new FormControl('', Validators.pattern('\\d*'))
    });
  }

  setFormData(id: number) {
    const req = {
      id: id
    };

    this.introductionSiteService.getIntroductionSiteDetail(req).subscribe(
      (res) => {
        if (res.status === ConstantsCommon.HTTP_STATUS_200) {
          this.formData.patchValue(res.item);
        } else {
          this.router.navigate(['ecoland/introduction-site-list']);
        }
      },
      (err) => {
        this.router.navigate(['ecoland/introduction-site-list']);
      }
    );
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.formData.invalid) {
      return;
    }
    if (this.id) {
      this.formData.controls['introductionSiteId'].setValue(this.id);
    }

    this.introductionSiteService.updateIntroductionSite(this.formData.value).subscribe(
      (res) => {
        if (res.status === ConstantsCommon.HTTP_STATUS_200) {
          this.toastSuccess();
          setTimeout(() => {
            this.router.navigate(['ecoland/introduction-site-list']);
          }, 1500);
        }
        else {
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
}
