import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface ShowQuestionData {
  question: {
    title: string;
    textBelow: string;
    isMultiple: boolean;
  };
  answers: { content: number; isCorrect: boolean }[];
  isHorizontal: boolean;
}

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.scss']
})
export class ShowQuestionComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ShowQuestionData) {
    console.log(data);
  }

  ngOnInit() {}
}
