import { ToastrService } from 'ngx-toastr';
import { TestsService } from 'src/app/services/tests.service';
import { CreateTest } from './../../../models/create-test';
import { Component, OnInit } from '@angular/core';
import { BadInput } from 'src/app/exceptions/bad-input';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {
  constructor(
    private testsSerivce: TestsService,
    private toast: ToastrService
  ) {}
  test = new CreateTest();

  ngOnInit() {}
  addTest(test) {
    this.testsSerivce.create(test).subscribe(
      data => {
        this.toast.success('test saved successfully 👌');
      },
      err => {
        if (err instanceof BadInput) {
          this.toast.error(err.error);
        }
      }
    );
  }
}
