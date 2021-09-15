import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntroductionSiteRoutingModule } from './introduction-site-routing.module';
import { EclCommonModule } from 'src/app/common/ecl-common.module';
import { IntroductionSiteListComponent } from './introduction-site-list/introduction-site-list.component';
import { IntroductionSiteEditComponent } from './introduction-site-edit/introduction-site-edit.component';


@NgModule({
  declarations: [
    IntroductionSiteListComponent,
    IntroductionSiteEditComponent
  ],
  imports: [
    CommonModule,
    IntroductionSiteRoutingModule,
    EclCommonModule
  ]
})
export class IntroductionSiteModule { }
