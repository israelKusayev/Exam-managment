import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TestsService } from 'src/app/services/tests.service';

@Component({
  selector: 'app-test-instructions',
  templateUrl: './test-instructions.component.html',
  styleUrls: ['./test-instructions.component.scss']
})
export class TestInstructionsComponent implements OnInit {
  id: string;
  constructor(
    public testsService: TestsService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    console.log(this.testsService.getTest());
  }
}
