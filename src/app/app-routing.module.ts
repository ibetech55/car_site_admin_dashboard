import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './template/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/components/dashboard/dashboard.component';
import { ViewMakesComponent } from './Pages/brands/components/view-makes/view-makes.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'brands',
        loadChildren: () =>
          import('./Pages/brands/brands.module').then(
            (opt) => opt.BrandsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
