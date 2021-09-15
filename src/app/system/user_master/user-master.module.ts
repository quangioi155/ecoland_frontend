import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMasterRoutingModule } from './user-master-routing.module';
import { EclCommonModule } from 'src/app/common/ecl-common.module';
import { UserMatsterListComponent } from './user-matster-list/user-matster-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';


@NgModule({
  declarations: [
    UserMatsterListComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    UserMasterRoutingModule,
    EclCommonModule
  ]
})
export class UserMasterModule { }
