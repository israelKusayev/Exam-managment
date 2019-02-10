import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import * as moment from 'moment';
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
    'questionCount',
    'lastUpdate',
    'status'
  ];
  // displayedColumns: string[] = ['id', 'name', 'QuestionCount', 'LastUpdate','buttons'];
  dataSource = new MatTableDataSource<Test>(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      const words = filter.split(',');
      debugger;
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface Test {
  id: number;
  name: string;
  questionCount: number;
  lastUpdate: string;
}

const ELEMENT_DATA: Test[] = [
  {
    id: 1,
    name: 'Hydrogen',
    questionCount: 1,
    lastUpdate: moment().format('DD/MM/YYYY')
  },
  {
    id: 2,
    name: 'Helium abc def israel kusayev',
    questionCount: 4,
    lastUpdate: 'He'
  },
  {
    id: 3,
    name: 'Lithium abc def israel kusayev',
    questionCount: 6,
    lastUpdate: 'Li'
  },
  {
    id: 4,
    name: 'Beryllium abc def israel',
    questionCount: 9,
    lastUpdate: 'Be'
  },
  { id: 5, name: 'Boron', questionCount: 10, lastUpdate: 'B' },
  { id: 6, name: 'Carbon', questionCount: 12, lastUpdate: 'C' },
  { id: 7, name: 'Nitrogen', questionCount: 14, lastUpdate: 'N' },
  { id: 8, name: 'Oxygen', questionCount: 15, lastUpdate: 'O' },
  { id: 9, name: 'Fluorine', questionCount: 18, lastUpdate: 'F' },
  { id: 10, name: 'Neon', questionCount: 20, lastUpdate: 'Ne' }
];
