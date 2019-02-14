import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { BadInput } from 'src/app/exceptions/bad-input';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  showSpinner: boolean;
  success: boolean;
  errorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toast: ToastrService
  ) {}

  ngOnInit() {}

  signUp(): void {
    this.showSpinner = false;
    this.errorMessage = null;
    this.success = false;

    this.showSpinner = true;

    const user = new User();
    user.email = this.email;
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.phone = this.phone;

    this.authService.studentSignUp(user).subscribe(
      data => {
        this.showSpinner = false;
        this.success = true;
      },
      err => {
        if (err instanceof BadInput) {
          this.showSpinner = false;
          this.errorMessage = err.error;
        }
      },
      () => {
        this.showSpinner = false;
      }
    );
  }
}
