import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { BadInput } from 'src/app/exceptions/bad-input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  returnUrl: string;
  email: string;
  password: string;
  showSpinner = false;
  emailActivationNeeded = false;
  passwordResetLinkSent = false;
  errorMessage: string;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticationService,
    private toast: ToastrService) { }

  ngOnInit() {
    this.showSpinner = false;
    this.errorMessage = null;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.showSpinner = true;
    this.errorMessage = null;
    this.emailActivationNeeded = false;
    this.passwordResetLinkSent = false;

    this.authService.adminLogin(this.email, this.password).subscribe(() => {
      this.showSpinner = false;
      const user = this.authService.loggedInUser();
      console.log('user:');
      console.log(user);
        if (user.isActive) {
          this.router.navigate([this.returnUrl]);
      } else {
          this.emailActivationNeeded = true;
      }
    }, err => {
      console.log(err);
      if (err instanceof BadInput) {
        this.showSpinner = false;
        this.errorMessage = err.error;
      }
    }, () => {
      this.showSpinner = false;
    });

  }

  sendResetPasswordLink(): void {
    this.showSpinner = true;
    this.errorMessage = null;
    this.passwordResetLinkSent = false;
    this.authService.adminSendResetPasswordLink(this.email).subscribe(data => {
      this.showSpinner = false;
      this.passwordResetLinkSent = true;
    }, (err) => {
      this.showSpinner = false;
      this.errorMessage = 'Un error occured';
    }, () => {
      this.showSpinner = false;
    });
  }

}
