import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMakesComponent } from './components/view-makes/view-makes.component';
import { BrandRoutingModule } from './brands-routing.module';
import { ComponentsModule } from '../../shared/components/components.module';
import { DesignModule } from '../../shared/design/design.module';
import { MakeService } from '../../services/make.service';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { MakeDetailsComponent } from './makes-details/make-details/make-details.component';
import { CreateMakeComponent } from './create-make/create-make/create-make.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CreateMultipleMakesComponent } from './create-multiple-makes/create-multiple-makes/create-multiple-makes.component';

@NgModule({
  declarations: [
    ViewMakesComponent,
    MakeDetailsComponent,
    CreateMakeComponent,
    CreateMultipleMakesComponent,
  ],
  providers: [MakeService],
  imports: [
    CommonModule,
    BrandRoutingModule,
    DesignModule,
    ComponentsModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class BrandsModule { }
