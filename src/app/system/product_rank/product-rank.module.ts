import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRankRoutingModule } from './product-rank-routing.module';
import { EclCommonModule } from 'src/app/common/ecl-common.module';
import { RankListComponent } from './rank-list/rank-list.component';
import { RankEditComponent } from './rank-edit/rank-edit.component';


@NgModule({
  declarations: [
    RankListComponent,
    RankEditComponent
  ],
  imports: [
    CommonModule,
    ProductRankRoutingModule,
    EclCommonModule
  ]
})
export class ProductRankModule { }
