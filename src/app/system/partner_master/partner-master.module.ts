import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerMasterRoutingModule } from './partner-master-routing.module';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerEditComponent } from './partner-edit/partner-edit.component';
import { EclCommonModule } from 'src/app/common/ecl-common.module';


@NgModule({
  declarations: [
    PartnerListComponent,
    PartnerEditComponent
  ],
  imports: [
    CommonModule,
    PartnerMasterRoutingModule,
    EclCommonModule
  ]
})
export class PartnerMasterModule { }
