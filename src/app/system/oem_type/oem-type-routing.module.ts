import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eRole } from 'src/app/common/constants.common';
import { OemTypeEditComponent } from './oem-type-edit/oem-type-edit.component';
import { OemTypeListComponent } from './oem-type-list/oem-type-list.component';

const routes: Routes = [
  {
    path: 'oem-type-list',
    component: OemTypeListComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'oem-type-edit',
    component: OemTypeEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'oem-type-edit/:id',
    component: OemTypeEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OemTypeRoutingModule {}
