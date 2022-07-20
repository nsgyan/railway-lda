import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperCaseDirective } from './upper-case.directive';
import { LowercaseDirective } from './lower-case.directive';
import { CustomModelComponent } from './custom-model/custom-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
 UpperCaseDirective,
 LowercaseDirective,
 CustomModelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [UpperCaseDirective,LowercaseDirective]
})
export class SharedModule { }
