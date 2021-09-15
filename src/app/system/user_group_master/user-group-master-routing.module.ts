import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eRole } from 'src/app/common/constants.common';
import { UserGroupEditComponent } from './user-group-edit/user-group-edit.component';
import { UserGroupListComponent } from './user-group-list/user-group-list.component';

const routes: Routes = [
  {
    path: 'authority-list',
    component: UserGroupListComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'authority-edit/:id',
    component: UserGroupEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'authority-edit',
    component: UserGroupEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGroupMasterRoutingModule { }
