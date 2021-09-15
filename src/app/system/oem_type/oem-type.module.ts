import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OemTypeRoutingModule } from './oem-type-routing.module';
import { OemTypeEditComponent } from './oem-type-edit/oem-type-edit.component';
import { OemTypeListComponent } from './oem-type-list/oem-type-list.component';
import { EclCommonModule } from 'src/app/common/ecl-common.module';


@NgModule({
  declarations: [
    OemTypeEditComponent,
    OemTypeListComponent
  ],
  imports: [
    CommonModule,
    OemTypeRoutingModule,
    EclCommonModule
  ]
})
export class OemTypeModule { }
