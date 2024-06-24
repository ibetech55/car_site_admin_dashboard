import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivePipe } from './active.pipe/active.pipe';
import { FormatDatePipe } from './format.date/format.date.pipe';
import { DeepCopyPipe } from './deep.copy.pipe/deep.copy.pipe';



@NgModule({
  declarations: [
    ActivePipe,
    FormatDatePipe,
    DeepCopyPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ActivePipe,
    FormatDatePipe,
    DeepCopyPipe
  ]
})
export class PipesModule { }
