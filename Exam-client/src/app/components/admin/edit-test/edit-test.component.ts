import { CreateTest } from './../../../models/create-test';
import { Component, OnInit } from '@angular/core';
import { TestsService } from 'src/app/services/tests.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.scss']
})
export class EditTestComponent implements OnInit {
  test = new CreateTest();
  constructor(
    private testsService: TestsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.testsService.getOne(id).subscribe(data => {
        this.test = data[0];
        console.log(this.test);
      });
    }
  }

  editTest(test) {
    console.log(test);
  }
}
