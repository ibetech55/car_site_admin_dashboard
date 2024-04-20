import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewMakesComponent } from './components/view-makes/view-makes.component';
import { MakeDetailsComponent } from './makes-details/make-details/make-details.component';
import { CreateMakeComponent } from './create-make/create-make/create-make.component';
import { CreateMultipleMakesComponent } from './create-multiple-makes/create-multiple-makes/create-multiple-makes.component';

const routes: Routes = [
  {
    path: 'view_makes',
    component: ViewMakesComponent,
  },
  {
    path: 'make/:id',
    component: MakeDetailsComponent,
  },
  {
    path: 'create_make',
    component: CreateMakeComponent,
  },
  {
    path: 'create_multiple_makes',
    component: CreateMultipleMakesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandRoutingModule {}