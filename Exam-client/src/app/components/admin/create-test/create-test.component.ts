import { CreateTest } from './../../../models/create-test';
import { LanguageService } from './../../../services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
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

  model = new CreateTest();
  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.getAll().subscribe(languages => {
      this.languages = languages;
    });
  }

  submit(data: any) {
    console.log(this.model);
  }
}
