import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eRole } from 'src/app/common/constants.common';
import { IntroductionSiteEditComponent } from './introduction-site-edit/introduction-site-edit.component';
import { IntroductionSiteListComponent } from './introduction-site-list/introduction-site-list.component';

const routes: Routes = [
  {
    path: 'introduction-site-list',
    component: IntroductionSiteListComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'introduction-site-edit',
    component: IntroductionSiteEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'introduction-site-edit/:id',
    component: IntroductionSiteEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroductionSiteRoutingModule { }
