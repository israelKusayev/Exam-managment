import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.scss']
})
export class SubmitDialogComponent implements OnInit {
  id: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);

    this.id = data.id;
  }

  ngOnInit() {}
}
