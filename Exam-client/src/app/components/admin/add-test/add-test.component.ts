import { AuthenticationService } from './../../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { TestsService } from 'src/app/services/tests.service';
import { CreateTest } from './../../../models/create-test';
import { Component, OnInit } from '@angular/core';
import { BadInput } from 'src/app/exceptions/bad-input';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {
  constructor(
    private testsService: TestsService,
    private toast: ToastrService,
    private router: Router,
    private subjectService: SubjectService,
    private authService: AuthenticationService
  ) {}
  test = new CreateTest(
    this.subjectService.subjectId,
    this.authService.loggedInUser().email
  );

  ngOnInit() {}
  addTest(test: any) {
    this.testsService.create(test).subscribe(
      () => {
        this.toast.success('test saved successfully 👌');
        this.router.navigate(['/manage-tests']);
      },
      err => {
        if (err instanceof BadInput) {
          this.toast.error(err.error);
        }
      }
    );
  }
}
