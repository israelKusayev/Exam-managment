import { Component, OnInit, Input } from '@angular/core';
import { PossibleAnswer } from 'src/app/models/possible-answer';
import { SubjectService } from 'src/app/services/subject.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { BadInput } from 'src/app/exceptions/bad-input';
import { ShowQuestionComponent } from '../show-question/show-question.component';
import { MatDialog, MatRadioChange } from '@angular/material';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  valid = true;
  updateMode = false;
  question: Question = new Question();
  constructor(
    public subjectService: SubjectService,
    private questionsService: QuestionsService,
    private toast: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.question.possibleAnswers.push(new PossibleAnswer());
      this.question.subjectId = this.subjectService.subjectId;
      console.log(this.question);
    } else {
      this.updateMode = true;

      this.questionsService.getOne(id).subscribe(
        data => {
          console.log(data);
          this.question = data;
          for (const possibleAnswer of this.question.possibleAnswers) {
            possibleAnswer.multipleChoice = this.question.multipleChoice;
          }
        },
        err => console.error(err)
      );
    }
  }

  addPossibleAnswer() {
    this.question.possibleAnswers.push(
      new PossibleAnswer(this.question.multipleChoice)
    );
  }

  singleChoiceAnswerChange($event: MatRadioChange) {
    for (let i = 0; i < this.question.possibleAnswers.length; i++) {
      this.question.possibleAnswers[i].correct = $event.value === i;
    }
  }

  removeItem(index) {
    this.question.possibleAnswers.splice(index, 1);
  }

  answerSelected(): boolean {
    for (const possibleAnswer of this.question.possibleAnswers) {
      if (possibleAnswer.correct) {
        return true;
      }
    }
    return false;
  }

  validateForm() {
    this.valid = true;

    if (!this.answerSelected()) {
      this.valid = false;
      this.toast.error('No answer chosen');
    }
    for (const possibleAnswer of this.question.possibleAnswers) {
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
      this.dialog.open(ShowQuestionComponent, {
        data: this.question,
        autoFocus: false
      });
    }
  }

  save() {
    this.validateForm();

    if (this.valid) {
      const action = this.updateMode
        ? this.questionsService.update(
            this.question.id.toString(),
            this.question
          )
        : this.questionsService.create(this.question);

      action.subscribe(
        () => {
          this.toast.clear();
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
    for (const item of this.question.possibleAnswers) {
      item.multipleChoice = this.question.multipleChoice;
    }
  }
}
