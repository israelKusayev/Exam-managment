import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
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
  constructor() {}

  ngOnInit() {}

  submit(data: any) {
    console.log(data);
  }
}
