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
      const tags = data.Tags.split(',');
      console.log(tags);
      console.log(filterTags);

      tags.forEach(t => {
        filterTags.forEach(a => {
          console.log([a, t]);

          if (t.includes(a)) {
            console.log('true');
            return true;
          }
        });
      });
      return data.Title.includes(filter);
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

  showQuestion($event, id: number) {
    $event.preventDefault();
    this.dialog.open(ShowQuestionComponent, {
      data: {
        question: {
          title: 'What is the DOM',
          textBelow: 'jffsdjf fjkfsdf kdjfds ',
          isMultiple: false
        },
        answers: [
          { content: 'gffdgfgfgfgdfgfgfdgsdfd gdgfg', isCorrect: false },
          { content: 'yes its true', isCorrect: true },
          {
            content:
              'https://stackoverflow.com/questions/332422/get-the-name-of-an-objects-type gdgfg',
            isCorrect: false
          },
          { content: 'abc def ghi gdgfg', isCorrect: false }
        ],
        isHorizontal: false
      },
      autoFocus: false
    });
  }
}

export interface Questions {
  Id: number;
  Title: string;
  Tags: string;
}
