import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eRole } from 'src/app/common/constants.common';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserMatsterListComponent } from './user-matster-list/user-matster-list.component';

const routes: Routes = [
  {
    path: 'user-list',
    component: UserMatsterListComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'user-edit',
    component: UserEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMasterRoutingModule { }
