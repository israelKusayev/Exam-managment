import { Component, OnInit } from '@angular/core';
import { PossibleAnswer } from 'src/app/models/possible-answer';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  possibleAnswers: PossibleAnswer[] = [];
  multipleChoice = false;
  answer: number;
  errorMessage: string = null;
  invalid: boolean;
  questionText: string;
  textBelowQuestion: string;
  languages: any;
  languageId: any;
  verticalAnswersLayout: boolean;
  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.possibleAnswers.push(new PossibleAnswer());
    this.invalid = true;
    this.answer = -1;
    this.languageService.getAll().subscribe(data => {
      this.languages = data;
      console.log('languages:');
      console.log(this.languages);
    });
  }

  addPossibleAnswer() {
    this.possibleAnswers.push(new PossibleAnswer(this.multipleChoice));
  }

  removeItem(index) {
    this.possibleAnswers.splice(index, 1);
    if (this.possibleAnswers.length === 0) {
      this.answer = -1;
    }
  }

  answerSelected(): boolean {
    return this.answer !== -1 || this.multipleChoice;
  }
  save() {
    this.errorMessage = null;
    this.invalid = false;
    console.log(this);
    if (!this.answerSelected()) {
      this.invalid = true;
      this.errorMessage = 'No answer chosen';
    }
  }
  changeMultipleChoice() {
    for (const item of this.possibleAnswers) {
      item.multipleChoice = this.multipleChoice;
    }
  }
}
