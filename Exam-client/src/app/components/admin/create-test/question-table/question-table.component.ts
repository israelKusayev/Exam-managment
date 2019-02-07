import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-question-table',
  templateUrl: './question-table.component.html',
  styleUrls: ['./question-table.component.scss']
})
export class QuestionTableComponent implements OnInit, OnChanges {
  @Input() questions: Questions[];

  displayedColumns: string[] = ['select', 'title', 'show'];
  dataSource = new MatTableDataSource<Questions>();
  selection = new SelectionModel<Questions>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (!changes.questions.firstChange) {
      this.dataSource.data = changes.questions.currentValue as Questions[];
    }
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    // exclude 'id' in filter
    this.dataSource.filterPredicate = (data, filter) => {
      return data.Tags.includes(filter) || data.Title.includes(filter);
    };
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface Questions {
  Id: number;
  Title: string;
  Tags: string;
}