import { QuestionsService } from './../../../services/questions.service';
import { ToastrService } from 'ngx-toastr';
import { BadInput } from './../../../exceptions/bad-input';
import { CreateTest } from './../../../models/create-test';
import { LanguageService } from './../../../services/language.service';
import { Component, OnInit } from '@angular/core';
import { TestsService } from 'src/app/services/tests.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  questions: any[];
  languages: any[];
  model = new CreateTest();
  predifindTemplates: string[] = [
    '@TestName@',
    '@FirstName@',
    '@LastName@',
    '@Date@',
    '@OrgEmail@',
    '@Grade@',
    '@OrgName@',
    '@CertificateUrl@'
  ];

  constructor(
    private languageService: LanguageService,
    private testsSerivce: TestsService,
    private questionService: QuestionsService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.languageService.getAll().subscribe(languages => {
      this.languages = languages;
    });
    this.questionService.getAll().subscribe(questions => {
      this.questions = questions;
    });
  }

  submit(form: NgForm): void {
    if (form.valid) {
      this.testsSerivce.create(this.model).subscribe(
        data => {},
        err => {
          if (err instanceof BadInput) {
            this.toast.error(err.error);
          }
        }
      );
    }
  }
}
