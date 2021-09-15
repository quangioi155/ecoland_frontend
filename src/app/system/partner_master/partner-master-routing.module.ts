import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eRole } from 'src/app/common/constants.common';
import { PartnerEditComponent } from './partner-edit/partner-edit.component';
import { PartnerListComponent } from './partner-list/partner-list.component';

const routes: Routes = [
  {
    path: 'partner-list',
    component: PartnerListComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'partner-edit',
    component: PartnerEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'partner-edit/:id',
    component: PartnerEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerMasterRoutingModule { }
