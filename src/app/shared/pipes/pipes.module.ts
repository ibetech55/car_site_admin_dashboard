import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivePipe } from './active.pipe/active.pipe';
import { FormatDatePipe } from './format.date/format.date.pipe';



@NgModule({
  declarations: [
    ActivePipe,
    FormatDatePipe,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ActivePipe,
    FormatDatePipe,
  ]
})
export class PipesModule { }
