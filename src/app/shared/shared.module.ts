import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperCaseDirective } from './upper-case.directive';
import { LowercaseDirective } from './lower-case.directive';



@NgModule({
  declarations: [
 UpperCaseDirective,
 LowercaseDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [UpperCaseDirective,LowercaseDirective]
})
export class SharedModule { }
