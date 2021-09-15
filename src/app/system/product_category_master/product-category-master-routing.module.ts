import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eRole } from 'src/app/common/constants.common';
import { ProductCategoryEditComponent } from './product-category-edit/product-category-edit.component';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';

const routes: Routes = [
  {
    path: 'product-category-list',
    component: ProductCategoryListComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'product-category-edit',
    component: ProductCategoryEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  },
  {
    path: 'product-category-edit/:id',
    component: ProductCategoryEditComponent,
    data: {
      expectedRole: eRole.SYSTEM_FLAG
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryMasterRoutingModule { }
