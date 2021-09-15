import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eRole } from 'src/app/common/constants.common';
import { OemMappingEditComponent } from './oem-mapping-edit/oem-mapping-edit.component';
import { OemMappingListComponent } from './oem-mapping-list/oem-mapping-list.component';

const routes: Routes = [
  {
    path: 'OEM_mapping-list',
    component: OemMappingListComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'OEM_mapping-edit',
    component: OemMappingEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OemMappingRoutingModule { }
