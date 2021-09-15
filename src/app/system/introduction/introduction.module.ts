import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntroductionRoutingModule } from './introduction-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IntroductionEditComponent } from './introduction-edit/introduction-edit.component';
import { IntroductionListComponent } from './introduction-list/introduction-list.component';
import { TitleComponent } from 'src/app/common/component.common/title-component';
import { EclCommonModule } from 'src/app/common/ecl-common.module';

@NgModule({
  declarations: [
    IntroductionEditComponent,
    IntroductionListComponent,
  ],
  imports: [
    CommonModule, 
    IntroductionRoutingModule,
    EclCommonModule
    // DropdownModule,
    // TableModule,
    // ToastModule,
    // TitleComponent
  ]
})
export class IntroductionModule {}
