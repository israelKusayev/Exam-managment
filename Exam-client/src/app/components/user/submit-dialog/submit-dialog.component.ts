import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.scss']
})
export class SubmitDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SubmitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean
  ) {}

  ngOnInit() {}
}
