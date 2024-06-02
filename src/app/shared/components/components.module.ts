import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { DesignModule } from '../design/design.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { InputComponent } from './input/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LoadingComponent } from './loading/loading.component';
import { HorizontalLineComponent } from './horizontal-line/horizontal-line.component';
import { DialogComponent } from './dialog/dialog.component';
import { LabelTextComponent } from './label-text/label-text.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    PageHeaderComponent,
    LoadingComponent,
    HorizontalLineComponent,
    DialogComponent,
    LabelTextComponent,
  ],
  imports: [
    CommonModule,
    DesignModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    ButtonComponent,
    InputComponent,
    PageHeaderComponent,
    LoadingComponent,
    HorizontalLineComponent,
    DialogComponent,
    LabelTextComponent,
  ],
})
export class ComponentsModule { }
