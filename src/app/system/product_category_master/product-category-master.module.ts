import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoryMasterRoutingModule } from './product-category-master-routing.module';
import { EclCommonModule } from 'src/app/common/ecl-common.module';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductCategoryEditComponent } from './product-category-edit/product-category-edit.component';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [
    ProductCategoryListComponent,
    ProductCategoryEditComponent
  ],
  imports: [
    CommonModule,
    ProductCategoryMasterRoutingModule,
    AutoCompleteModule,
    EclCommonModule,
  ]
})
export class ProductCategoryMasterModule { }
