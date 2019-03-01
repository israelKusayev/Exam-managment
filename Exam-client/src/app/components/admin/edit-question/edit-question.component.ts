import { Component, OnInit, Input } from '@angular/core';
import { PossibleAnswer } from 'src/app/models/possible-answer';
import { SubjectService } from 'src/app/services/subject.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { BadInput } from 'src/app/exceptions/bad-input';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {
  id: string;
  question: Question = new Question();
  possibleAnswers: PossibleAnswer[] = [new PossibleAnswer()];
  fieldOfStudy: string;
  fieldOfStudyId: number;
  // multipleChoice = false;
  answer: number;
  errorMessage: string = null;
  invalid: boolean;
  // title: string;
  // textBelowQuestion: string;
  // tags: string;
  // horizontalDisplay = true;
  constructor(
    private subjectService: SubjectService,
    private questionsService: QuestionsService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fieldOfStudy = this.subjectService.subjectName;
    this.fieldOfStudyId = this.subjectService.subjectId;

    this.questionsService.getOne(this.id).subscribe(
      data => {
        console.log(data);
        this.question = data;
        this.possibleAnswers = this.question.possibleAnswers;
        this.answer = this.getQuestionAnswer();

        // adapt this.possibleAnswers to view
        for (let i = 0; i < this.possibleAnswers.length; i++) {
          // set up each item's multipleChoice to this.question.multipleChoice
          this.possibleAnswers[i].multipleChoice = this.question.multipleChoice;
          // if question is single choice, set each item to incorrect,
          // so it won't appear checked mark in the multiple choice mode
          if (!this.question.multipleChoice) {
            this.possibleAnswers[i].correct = false;
          }
        }
        this.invalid = false;
      },
      err => console.error(err)
    );
  }

  // calc correct answer from PossibleAnswer[] array
  getQuestionAnswer(): number {
    if (!this.question.multipleChoice && this.possibleAnswers) {
      for (let i = 0; i < this.possibleAnswers.length; i++) {
        if (this.possibleAnswers[i].correct) {
          console.log('ANSWER: ' + i);
          return i;
        }
      }
    }
    return -1;
  }
  addPossibleAnswer() {
    this.possibleAnswers.push(new PossibleAnswer(this.question.multipleChoice));
  }

  removeItem(index) {
    this.possibleAnswers.splice(index, 1);
    if (this.possibleAnswers.length === 0) {
      this.answer = -1;
    }
  }

  answerSelected(): boolean {
    if (!this.question.multipleChoice) {
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

  save() {
    this.errorMessage = null;
    this.invalid = false;
    console.log(this);
    if (!this.answerSelected()) {
      this.invalid = true;
      this.errorMessage = 'No answer chosen';
    }
    for (const possibleAnswer of this.possibleAnswers) {
      if (!possibleAnswer.title || possibleAnswer.title === '') {
        this.invalid = true;
        this.errorMessage = 'One of the possible answers is empty';
      }
    }

    if (!this.invalid) {
      console.log(this.question);
      console.log('ANSWER:' + this.answer);
      if (!this.question.multipleChoice) {
        for (let i = 0; i < this.possibleAnswers.length; i++) {
          this.possibleAnswers[i].correct = this.answer === i;
        }
      }
      this.question.possibleAnswers = this.possibleAnswers;
      this.questionsService.update(this.id, this.question).subscribe(
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
      item.multipleChoice = this.question.multipleChoice;
    }
  }
}
