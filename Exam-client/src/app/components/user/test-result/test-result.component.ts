import { Component, OnInit } from '@angular/core';
import { TestUserService } from 'src/app/services/test-user.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {
  constructor(public testService: TestUserService) {}

  ngOnInit() {}
}
