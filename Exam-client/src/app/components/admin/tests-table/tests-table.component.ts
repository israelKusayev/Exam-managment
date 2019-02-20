import { ToastrService } from 'ngx-toastr';
import { SubjectService } from './../../../services/subject.service';
import { TestsService } from 'src/app/services/tests.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

import { Router } from '@angular/router';
@Component({
  selector: 'app-tests-table',
  templateUrl: './tests-table.component.html',
  styleUrls: ['./tests-table.component.scss']
})
export class TestsTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'link',
    'name',
    'questionsCount',
    'lastUpdate',
    'status'
  ];

  dataSource = new MatTableDataSource<Test>([]);
  sort;
  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private testsService: TestsService,
    private subjectService: SubjectService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.testsService
      .getAll(true, `?subjectId=${this.subjectService.subjectId}`)
      .subscribe(data => {
        this.dataSource.data = data;
      });

    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data, filter) => {
      const words = filter.split(',');
      for (let i = 0; i < words.length; i++) {
        if (!data.name.toLowerCase().includes(words[i].toLowerCase())) {
          return false;
        }
        if (i === words.length - 1) {
          return true;
        }
      }
      return false;
    };
  }

  edit(id: number) {
    console.log(id);
    this.router.navigate(['manage-tests/edit/', id]);
  }

  delete(id: number) {
    this.testsService.delete(id.toString()).subscribe(data => {
      this.dataSource.data = this.dataSource.data.filter(d => d.id === id);
      this.toast.info('test deleted successfully');
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface Test {
  id: number;
  name: string;
  questionsCount: number;
  lastUpdate: string;
  isActive: boolean;
}
