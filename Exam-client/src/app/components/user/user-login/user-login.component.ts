import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { BadInput } from 'src/app/exceptions/bad-input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  email: string;
  showSpinner = false;
  success: boolean;
  errorMessage: string;

  constructor(private router: Router, private authService: AuthenticationService,
    private toast: ToastrService) { }

  ngOnInit() {
    this.showSpinner = false;
    this.errorMessage = null;
    this.success = false;
  }


login(): void {
  this.showSpinner = false;
  this.errorMessage = null;
  this.success = false;


  this.showSpinner = true;

  this.authService.studentLogin(this.email).subscribe((data) => {
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

