import { CreateTest } from './../../../models/create-test';
import { Component, OnInit } from '@angular/core';
import { TestsAdminService } from 'src/app/services/tests-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BadInput } from 'src/app/exceptions/bad-input';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.scss']
})
export class EditTestComponent implements OnInit {
  constructor(
    private testsService: TestsAdminService,
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private authService: AuthenticationService,
    private toast: ToastrService,
    private router: Router
  ) {}
  test = new CreateTest(
    this.subjectService.subjectId,
    this.authService.loggedInUser().email
  );
  questions: [];
  id: number;
  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.testsService.getOne(this.id.toString()).subscribe(data => {
        this.test = data[0][0];
        this.questions = data[1].map(d => {
          return d.questionId;
        });

        if (data.length === 0) {
          this.toast.error('test not found 🤐');
        }
      });
    }
  }

  editTest(test) {
    this.testsService.update(this.id.toString(), test).subscribe(
      () => {
        this.toast.success('test edited successfully 👌');
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
