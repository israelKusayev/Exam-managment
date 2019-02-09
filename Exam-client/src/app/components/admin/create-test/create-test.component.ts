import { ToastrService } from 'ngx-toastr';
import { CreateTest } from './../../../models/create-test';
import { LanguageService } from './../../../services/language.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  @Input() model: CreateTest;
  @Output() onSave = new EventEmitter();

  selectedQuestions: number[];
  languages: any[];
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
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.languageService.getAll().subscribe(languages => {
      this.languages = languages;
    });
  }

  onQuestionSelect(selectedQuestions: any[]) {
    this.selectedQuestions = selectedQuestions;
  }

  submit(form: NgForm): void {
    if (form.valid) {
      if (!this.selectedQuestions) {
        this.toast.warning('You must select at least one question');
        return;
      }
      this.onSave.emit({
        details: this.model,
        questions: this.selectedQuestions
      });
    }
  }
}
