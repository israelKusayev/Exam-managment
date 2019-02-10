import { AnswerService } from './../../../../services/answer.service';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { QuestionsService } from 'src/app/services/questions.service';
import { ShowQuestionComponent } from '../../show-question/show-question.component';

@Component({
  selector: 'app-question-table',
  templateUrl: './question-table.component.html',
  styleUrls: ['./question-table.component.scss']
})
export class QuestionTableComponent implements OnInit {
  @Output() select = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['select', 'title', 'show'];
  dataSource = new MatTableDataSource<Questions>();
  selection = new SelectionModel<Questions>(true, []);

  constructor(
    private questionsService: QuestionsService,
    private answerService: AnswerService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.questionsService.getAll().subscribe(questions => {
      this.dataSource.data = questions;
    });
    this.dataSource.paginator = this.paginator;

    // exclude 'id' in filter
    this.dataSource.filterPredicate = (data, filter) => {
      const filterTags = filter.split(',');

      for (let i = 0; i < filterTags.length; i++) {
        if (!data.Tags.toLowerCase().includes(filterTags[i].toLowerCase())) {
          continue;
        }
        if (i === filterTags.length - 1) {
          return true;
        }
      }
      return data.Title.toLowerCase().includes(filter.toLowerCase());
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
    this.select.emit(
      this.selection.selected.map(q => {
        return q.Id;
      })
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelect(row) {
    this.selection.toggle(row);
    this.select.emit(
      this.selection.selected.map(q => {
        return q.Id;
      })
    );
  }

  showQuestion(id: number) {
    this.answerService.getOne(id.toString()).subscribe(answers => {
      this.dialog.open(ShowQuestionComponent, {
        data: {
          question: this.dataSource.data.find(q => q.Id === id),
          answers: answers
        },
        autoFocus: false
      });
    });
  }
}

export interface Questions {
  Id: number;
  Title: string;
  Tags: string;
  TextBelow: string;
  HorizontalDisplay: boolean;
  MultipleChoice: boolean;
}
