import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCheckboxModule,
  MatSelectModule,
  MatRadioModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule],
  exports: [
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule
  ]
})
export class MatComponentsModule {}
