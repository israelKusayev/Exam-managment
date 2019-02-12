import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCheckboxModule,
  MatMenuModule,
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
  MatTableModule,
  MatSortModule,
  MatCardModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatDialogModule,
  MatExpansionModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule],
  exports: [
    MatCheckboxModule,
    MatMenuModule,
    MatExpansionModule,
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
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class MatComponentsModule {}
