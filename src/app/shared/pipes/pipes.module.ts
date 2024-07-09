import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivePipe } from './active.pipe/active.pipe';
import { FormatDatePipe } from './format.date/format.date.pipe';
import { DeepCopyPipe } from './deep.copy.pipe/deep.copy.pipe';
import { StringSeperatorPipe } from './string-seperator.pipe';



@NgModule({
  declarations: [
    ActivePipe,
    FormatDatePipe,
    DeepCopyPipe,
    StringSeperatorPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ActivePipe,
    FormatDatePipe,
    DeepCopyPipe,
    StringSeperatorPipe
  ]
})
export class PipesModule { }
