import { SubjectService } from './../../services/subject.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    public authenticationService: AuthenticationService,
    public subjectService: SubjectService
  ) {}

  ngOnInit() {}

  logout(): void {
    this.authenticationService.logout();
  }
}
