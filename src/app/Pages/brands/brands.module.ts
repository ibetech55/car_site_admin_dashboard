import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMakesComponent } from './view-makes/view-makes.component';
import { BrandRoutingModule } from './brands-routing.module';
import { ComponentsModule } from '../../shared/components/components.module';
import { DesignModule } from '../../shared/design/design.module';
import { MakeService } from '../../services/make.service';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { MakeDetailsComponent } from './makes-details/make-details.component';
import { CreateMakeComponent } from './create-make/create-make.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateMultipleMakesComponent } from './create-multiple-makes/create-multiple-makes.component';
import { EditMakeDialogComponent } from './makes-details/components/edit-make-dialog/edit-make-dialog.component';
import { ViewModelsComponent } from './view-models/view-models.component';
import { CreateModelComponent } from './create-model/create-model.component';
import { CreateMultipleModelsComponent } from './create-multiple-models/create-multiple-models.component';
import { ModelCategoriesComponent } from './create-model-categories/model-categories.component';
import { ModelDetailsComponent } from './model-details/model-details.component';
import { EditModelModalComponent } from './model-details/components/edit-model-modal/edit-model-modal.component';
import { ViewMakesTableComponent } from './view-makes/components/view-makes-table/view-makes-table.component';
import { CreateModelFormComponent } from './create-model/components/create-model-form/create-model-form.component';
import { CreateMakeFormComponent } from './create-make/components/create-make-form/create-make-form.component';
import { CreateMultipleMakesFormComponent } from './create-multiple-makes/components/create-multiple-makes-form/create-multiple-makes-form';
import { CreateMultipleModelsFormComponent } from './create-multiple-models/components/create-multiple-models-form/create-multiple-models-form.component';
import { CreateModelCategoriesFormComponent } from './create-model-categories/components/create-model-categories-form/create-model-categories-form.component';
import { ModelCategoriesTableComponent } from './create-model-categories/components/model-categories-table/model-categories-table.component';
import { MakeDetailsInfoComponent } from './makes-details/components/make-details-info/make-details-info.component';
import { MakeDetailsModelsTableComponent } from './makes-details/components/make-details-models-table/make-details-models-table.component';
import { ModelDetailsInfoComponent } from './model-details/components/model-details-info/model-details-info.component';
import { ModelCategoryDetailsPageComponent } from './model-category-details/model-category-details-page/model-category-details-page.component';
import { McDetailsComponent } from './model-category-details/components/mc-details/mc-details.component';
import { McEditModalComponent } from './model-category-details/components/mc-edit-modal/mc-edit-modal.component';

@NgModule({
  declarations: [
    ViewMakesComponent,
    MakeDetailsComponent,
    CreateMakeComponent,
    CreateMultipleMakesComponent,
    EditMakeDialogComponent,
    ViewModelsComponent,
    CreateModelComponent,
    CreateMultipleModelsComponent,
    ModelCategoriesComponent,
    ModelDetailsComponent,
    EditModelModalComponent,
    ViewMakesTableComponent,
    CreateModelFormComponent,
    CreateMakeFormComponent,
    CreateMultipleMakesFormComponent,
    CreateMultipleModelsFormComponent,
    CreateModelCategoriesFormComponent,
    ModelCategoriesTableComponent,
    MakeDetailsInfoComponent,
    MakeDetailsModelsTableComponent,
    ModelDetailsInfoComponent,
    ModelCategoryDetailsPageComponent,
    McDetailsComponent,
    McEditModalComponent,
  ],
  providers: [MakeService],
  imports: [
    CommonModule,
    BrandRoutingModule,
    DesignModule,
    ComponentsModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BrandsModule { }
