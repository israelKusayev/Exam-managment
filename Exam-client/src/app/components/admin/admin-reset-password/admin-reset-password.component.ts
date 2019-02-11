import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { BadInput } from 'src/app/exceptions/bad-input';

@Component({
  selector: 'app-admin-reset-password',
  templateUrl: './admin-reset-password.component.html',
  styleUrls: ['./admin-reset-password.component.scss']
})
export class AdminResetPasswordComponent implements OnInit {
  token: string;
  email: string;
  emailRecieved = false;
  password: string;
  confirmPassword: string;
  showSpinner = false;
  success: boolean;
  errorMessage: string;

  constructor(private router: Router, private authService: AuthenticationService,
    private toast: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.errorMessage = null;
    this.emailRecieved = false;
    this.success = false;

    this.showSpinner = true;

    // this.token = this.route.data;
    this.token = this.route.snapshot.params['token'];
    console.log('token = ' + this.token);
    this.authService.getEmailByResetPasswordToken(this.token).subscribe(data => {
      this.showSpinner = false;
      console.log('data from getEmailByResetPasswordToken:');
      console.log(data);
      this.email = data.email;
      this.emailRecieved = true;
    }, err => {
      console.log('err from getEmailByResetPasswordToken:');
      console.log(err);
      this.errorMessage = 'Unexpected error';
      this.showSpinner = false;
    }, () => {
      this.showSpinner = false;
    });

  }


  resetPassword(): void {
  this.showSpinner = false;
  this.errorMessage = null;
  this.success = false;

  if (this.password !== this.confirmPassword) {

    this.errorMessage = 'Passwords do not match';
    return;
  }

  this.showSpinner = true;
  this.authService.adminResetPassword(this.token, this.password).subscribe((data) => {
    this.showSpinner = false;
    this.success = true;
  }, err => {
    if (err instanceof BadInput) {
      this.showSpinner = false;
      this.errorMessage = err.error;
    }
  }, () => {
    this.showSpinner = false;
  });
}

}
