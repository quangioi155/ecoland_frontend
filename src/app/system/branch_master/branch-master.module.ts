import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchMasterRoutingModule } from './branch-master-routing.module';
import { EclCommonModule } from 'src/app/common/ecl-common.module';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchEditComponent } from './branch-edit/branch-edit.component';


@NgModule({
  declarations: [
    BranchListComponent,
    BranchEditComponent
  ],
  imports: [
    CommonModule,
    BranchMasterRoutingModule,
    EclCommonModule
  ]
})
export class BranchMasterModule { }
