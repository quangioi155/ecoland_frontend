import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserGroupMasterRoutingModule } from './user-group-master-routing.module';
import { UserGroupListComponent } from './user-group-list/user-group-list.component';
import { UserGroupEditComponent } from './user-group-edit/user-group-edit.component';
import { EclCommonModule } from 'src/app/common/ecl-common.module';


@NgModule({
  declarations: [
    UserGroupListComponent,
    UserGroupEditComponent
  ],
  imports: [
    CommonModule,
    UserGroupMasterRoutingModule,
    EclCommonModule
  ]
})
export class UserGroupMasterModule { }
