import { Component, OnInit } from '@angular/core';
import { PossibleAnswer } from 'src/app/models/possible-answer';
import { SubjectService } from 'src/app/services/subject.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BadInput } from 'src/app/exceptions/bad-input';
import { ShowQuestionComponent } from '../show-question/show-question.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  fieldOfStudy: string;
  fieldOfStudyId: number;
  possibleAnswers: PossibleAnswer[] = [];
  multipleChoice = false;
  answer: number;
  valid: boolean;
  title: string;
  textBelowQuestion: string;
  tags: string;
  horizontalDisplay = true;
  constructor(
    private subjectService: SubjectService,
    private questionsService: QuestionsService,
    private toast: ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fieldOfStudy = this.subjectService.subjectName;
    this.fieldOfStudyId = this.subjectService.subjectId;
    this.possibleAnswers.push(new PossibleAnswer());
    this.valid = false;
    this.answer = -1;
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
    if (!this.multipleChoice) {
      return this.answer !== -1;
    } else {
      for (const possibleAnswer of this.possibleAnswers) {
        if (possibleAnswer.correct) {
          return true;
        }
      }
      return false;
    }
  }

  validateForm() {
    this.valid = true;

    if (!this.answerSelected()) {
      this.valid = false;
      this.toast.error('No answer chosen');
    }
    for (const possibleAnswer of this.possibleAnswers) {
      if (!possibleAnswer.title || possibleAnswer.title === '') {
        this.valid = false;
        this.toast.error('One of the possible answers is empty');
        break;
      }
    }
  }

  show() {
    this.validateForm();

    if (this.valid) {
      const question = {
        subjectId: this.fieldOfStudyId,
        possibleAnswers: this.possibleAnswers,
        title: this.title,
        multipleChoice: this.multipleChoice,
        answer: this.answer,
        textBelowQuestion: this.textBelowQuestion,
        tags: this.tags,
        horizontalDisplay: this.horizontalDisplay
      };
      this.dialog
        .open(ShowQuestionComponent, {
          data: question,
          autoFocus: false
        })
        .afterClosed()
        .subscribe(() => console.log('dsfsdfsf'));
    }
  }

  save() {
    this.validateForm();

    if (this.valid) {
      const question = {
        subjectId: this.fieldOfStudyId,
        possibleAnswers: this.possibleAnswers,
        title: this.title,
        multipleChoice: this.multipleChoice,
        answer: this.answer,
        textBelowQuestion: this.textBelowQuestion,
        tags: this.tags,
        horizontalDisplay: this.horizontalDisplay
      };

      this.questionsService.create(question).subscribe(
        () => {
          this.toast.success('question saved successfully');
          this.router.navigate(['/manage-questions']);
        },
        err => {
          if (err instanceof BadInput) {
            this.toast.error(err.error);
          }
        }
      );
    }
  }

  changeMultipleChoice() {
    for (const item of this.possibleAnswers) {
      item.multipleChoice = this.multipleChoice;
    }
  }
}
