import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eRole } from 'src/app/common/constants.common';
import { RankEditComponent } from './rank-edit/rank-edit.component';
import { RankListComponent } from './rank-list/rank-list.component';

const routes: Routes = [
  {
    path: 'rank-list',
    component: RankListComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'rank-edit',
    component: RankEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'rank-edit/:id',
    component: RankEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRankRoutingModule { }
