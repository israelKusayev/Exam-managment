import { AuthenticationService } from './../../../services/authentication.service';
import { SubjectService } from './../../../services/subject.service';
import { OrganizationService } from './../../../services/organization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  organizations: OrganizationData[];
  Subjects: SubjectData[];
  constructor(
    private organizationService: OrganizationService,
    private authService: AuthenticationService,
    private subjectService: SubjectService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.loggedInUser();

    this.organizationService.getOne(user.email).subscribe(data => {
      this.organizations = data;
    });
  }

  handleOrganizationSelect(id: number) {
    this.subjectService.getOne(id.toString()).subscribe(data => {
      this.Subjects = data;
    });
  }

  handleSubjectSelect(subject: SubjectData) {
    this.subjectService.currentSubject = subject;
    this.router.navigate(['/manage-tests']);
  }
}

export interface OrganizationData {
  name: string;
  organizationId: number;
}
export interface SubjectData {
  name: string;
  id: number;
}
