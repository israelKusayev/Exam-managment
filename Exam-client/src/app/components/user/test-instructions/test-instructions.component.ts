import { TestUserService } from 'src/app/services/test-user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-instructions',
  templateUrl: './test-instructions.component.html',
  styleUrls: ['./test-instructions.component.scss']
})
export class TestInstructionsComponent implements OnInit {
  id: string;
  constructor(
    public testsService: TestUserService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {}
}
