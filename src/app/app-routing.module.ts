import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eRole } from './common/constants.common';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { HomeComponent } from './home/home.component';
import { NoRule } from './main/no-rule/no-rule';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './security/login/login.component';
import { ZecListComponent } from './zec/zec-list/zec-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'ecoland',
    component: HomeComponent,
    children: [
      {
        path: 'search-project',
        component: CustomerListComponent,
        data: {
          expectedRole: eRole.CONTACT_CUSTOMER_FLAG
        }
      },
      {
        path: 'zec',
        component: ZecListComponent,
        data: {
          expectedRole: eRole.ZEC_FLAG
        }
      },
      {
        path: '',
        loadChildren: () =>
          import('./system/user_master/user-master.module').then(
            (m) => m.UserMasterModule
          )
      },
      {
        path: '',
        loadChildren: () =>
          import('./system/partner_master/partner-master.module').then(
            (m) => m.PartnerMasterModule
          )
      },
      {
        path: '',
        loadChildren: () =>
          import('./system/user_group_master/user-group-master.module').then(
            (m) => m.UserGroupMasterModule
          )
      },
      {
        path: '',
        loadChildren: () =>
          import('./system/branch_master/branch-master.module').then(
            (m) => m.BranchMasterModule
          )
      },
      {
        path: '',
        loadChildren: () =>
          import('./system/product_rank/product-rank.module').then(
            (m) => m.ProductRankModule
          )
      },
      {
        path: '',
        loadChildren: () =>
          import('./system/categories/category.module').then(
            (m) => m.CategoryModule
          )
      },
      {
        path: '',
        loadChildren: () =>
          import('./system/category-small/category-small.module').then(
            (m) => m.CategorySmallModule
          )
      },
      {
        path: '',
        loadChildren: () =>
          import('./system/introduction/introduction.module').then(
            (m) => m.IntroductionModule
          )
      },
      {
        path: '',
        loadChildren: () =>
          import('./system/oem_type/oem-type.module').then(
            (m) => m.OemTypeModule
          )
      },
      {
        path: '',
        loadChildren: () =>
          import('./system/product_category_master/product-category-master.module').then(
            (m) => m.ProductCategoryMasterModule
          )
      },
      {
        path: '',
        loadChildren: () =>
          import('./system/oem-mapping/oem-mapping.module').then(
            (m) => m.OemMappingModule
          )
      },
      {
        path: '',
        loadChildren: () =>
          import('./system/introduction-site/introduction-site.module').then(
            (m) => m.IntroductionSiteModule
          )
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NoRule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
