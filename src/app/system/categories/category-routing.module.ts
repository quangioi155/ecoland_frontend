import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eRole } from 'src/app/common/constants.common';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {
    path: 'web_categ1-list',
    component: CategoryListComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'web_categ1-edit',
    component: CategoryEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
