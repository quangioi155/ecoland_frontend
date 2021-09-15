import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OemMappingRoutingModule } from './oem-mapping-routing.module';
import { EclCommonModule } from 'src/app/common/ecl-common.module';
import { OemMappingListComponent } from './oem-mapping-list/oem-mapping-list.component';
import { OemMappingEditComponent } from './oem-mapping-edit/oem-mapping-edit.component';


@NgModule({
  declarations: [
    OemMappingListComponent,
    OemMappingEditComponent
  ],
  imports: [
    CommonModule,
    OemMappingRoutingModule,
    EclCommonModule
  ]
})
export class OemMappingModule { }