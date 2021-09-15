import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eRole } from 'src/app/common/constants.common';
import { CategorySmallEditComponent } from './category-small-edit/category-small-edit.component';
import { CategorySmallListComponent } from './category-small-list/category-small-list.component';

const routes: Routes = [
  {
    path: 'web_categ2-list',
    component: CategorySmallListComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'web_categ2-edit',
    component: CategorySmallEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'web_categ2-edit/:id',
    component: CategorySmallEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorySmallRoutingModule { }
