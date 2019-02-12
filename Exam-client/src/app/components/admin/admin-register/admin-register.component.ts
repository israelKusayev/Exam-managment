import { Component, OnInit } from '@angular/core';
import { BadInput } from 'src/app/exceptions/bad-input';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent implements OnInit {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
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


  register(): void {
    this.showSpinner = false;
    this.errorMessage = null;
    this.success = false;

    if (this.password !== this.confirmPassword) {

      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.showSpinner = true;
    this.authService.adminRegister(this.email, this.password, this.name).subscribe((data) => {
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
