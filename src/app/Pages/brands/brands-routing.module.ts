import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewMakesComponent } from './components/view-makes/view-makes.component';
import { MakeDetailsComponent } from './makes-details/make-details/make-details.component';
import { CreateMakeComponent } from './create-make/create-make/create-make.component';
import { CreateMultipleMakesComponent } from './create-multiple-makes/create-multiple-makes/create-multiple-makes.component';
import { ViewModelsComponent } from './view-models/view-models.component';
import { CreateModelComponent } from './create-model/create-model.component';
import { CreateMultipleModelsComponent } from './create-multiple-models/create-multiple-models.component';
import { ModelCategoriesComponent } from './model-categories/model-categories.component';
import { ModelDetailsComponent } from './model-details/model-details.component';

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
  {
    path: 'view_models',
    component: ViewModelsComponent,
  },
  {
    path: 'create_model',
    component: CreateModelComponent,
  },
  {
    path: 'create_multiple_models',
    component: CreateMultipleModelsComponent,
  },
  {
    path: 'model_categories',
    component: ModelCategoriesComponent,
  },
  {
    path: 'model/:id',
    component: ModelDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandRoutingModule {}