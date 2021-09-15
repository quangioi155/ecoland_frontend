import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorySmallRoutingModule } from './category-small-routing.module';
import { CategorySmallListComponent } from './category-small-list/category-small-list.component';
import { CategorySmallEditComponent } from './category-small-edit/category-small-edit.component';
import { EclCommonModule } from 'src/app/common/ecl-common.module';


@NgModule({
  declarations: [
    CategorySmallListComponent,
    CategorySmallEditComponent
  ],
  imports: [
    CommonModule,
    CategorySmallRoutingModule,
    EclCommonModule
  ]
})
export class CategorySmallModule { }
