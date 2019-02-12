import { ToastrService } from 'ngx-toastr';
import { CreateTest } from './../../../models/create-test';
import { LanguageService } from './../../../services/language.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { CertificatesService } from 'src/app/services/certificates.service';
import { SubjectService } from 'src/app/services/subject.service';

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
  certificates: string[];
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
    private certificatesService: CertificatesService,
    public subjectService: SubjectService,
    private toast: ToastrService,
    public location: Location
  ) {}

  ngOnInit() {
    this.languageService.getAll().subscribe(languages => {
      this.languages = languages;
    });

    this.certificatesService.getAll().subscribe(certificates => {
      this.certificates = certificates;
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
