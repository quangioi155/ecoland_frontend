import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eRole } from 'src/app/common/constants.common';
import { IntroductionEditComponent } from './introduction-edit/introduction-edit.component';
import { IntroductionListComponent } from './introduction-list/introduction-list.component';

const routes: Routes = [
  {
    path: 'introduction-list',
    component: IntroductionListComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'introduction-edit',
    component: IntroductionEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'introduction-edit/:id',
    component: IntroductionEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroductionRoutingModule {}
