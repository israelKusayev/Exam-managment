import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-manage-tests',
  templateUrl: './manage-tests.component.html',
  styleUrls: ['./manage-tests.component.scss']
})
export class ManageTestsComponent implements OnInit {
  constructor(public subjectService: SubjectService) {}

  ngOnInit() {}
}
