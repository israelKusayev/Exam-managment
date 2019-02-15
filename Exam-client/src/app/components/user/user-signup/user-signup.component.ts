import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { BadInput } from 'src/app/exceptions/bad-input';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {
  showSpinner: boolean;
  errorMessage: string;
  user = new User();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  signUp(): void {
    this.errorMessage = null;

    this.showSpinner = true;

    this.authService.studentSignUp(this.user).subscribe(
      () => {
        this.router.navigate([
          'test',
          this.activatedRoute.snapshot.params.id,
          'instructions'
        ]);
      },
      err => {
        if (err instanceof BadInput) {
          this.errorMessage = err.error;
        }
      },
      () => {
        this.showSpinner = false;
      }
    );
  }
}
