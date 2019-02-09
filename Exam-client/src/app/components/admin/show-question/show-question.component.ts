import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.scss']
})
export class ShowQuestionComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public questionId: number) {
    console.log(questionId);
  }

  ngOnInit() {}
}
