import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesignModule } from './shared/design/design.module';
import { LayoutComponent } from './template/layout/layout.component';
import { ComponentsModule } from './shared/components/components.module';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { appReducers } from './Store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MakeEffects } from './Store/Make/make.effect';
import { PipesModule } from './shared/pipes/pipes.module';
import { MakeService } from './services/make.service';
import { ModelEffects } from './Store/Model/model.effect';
import { ModelCategoryEffects } from './Store/ModelCategory/model.category.effect';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    DesignModule,
    ComponentsModule,
    PanelMenuModule,
    BrowserAnimationsModule,
    RouterOutlet,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([MakeEffects, ModelEffects, ModelCategoryEffects]),
    PipesModule
  ],
  providers: [MakeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
