import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.scss']
})
export class ShowQuestionComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Question) {
    console.log(data);
  }

  ngOnInit() {}
}
