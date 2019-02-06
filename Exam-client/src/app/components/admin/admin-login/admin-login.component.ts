import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  email: string;
  password: string;
  showSpinner = false;
  emailActivationNeeded: boolean;
  errorMessage: string;

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.showSpinner = false;
    this.errorMessage = null;
  }

  login(): void {
    this.showSpinner = true;
    this.errorMessage = null;
    this.emailActivationNeeded = false;

    this.authService.adminLogin(this.email, this.password).subscribe((success) => {
      this.showSpinner = false;
      if (success) {
        const user = JSON.parse( localStorage.getItem(environment.currentUserStorageKey));
        console.log(user);
          if (user.isActive) {
            this.router.navigate(['manage-questions']);
        } else {
            this.emailActivationNeeded = true;
        }
       } else {
          this.errorMessage = 'Invalid login attempt';
       }
    });


  }

}
