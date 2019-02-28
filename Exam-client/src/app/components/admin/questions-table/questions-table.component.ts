import { ToastrService } from 'ngx-toastr';
import { SubjectService } from './../../../services/subject.service';
import { TestsAdminService } from 'src/app/services/tests-admin.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.scss']
})
export class QuestionsTableComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
