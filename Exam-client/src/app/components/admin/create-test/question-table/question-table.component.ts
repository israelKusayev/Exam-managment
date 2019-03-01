import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { QuestionsService } from 'src/app/services/questions.service';
import { ShowQuestionComponent } from '../../show-question/show-question.component';
import { SubjectService } from 'src/app/services/subject.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question-table',
  templateUrl: './question-table.component.html',
  styleUrls: ['./question-table.component.scss']
})
export class QuestionTableComponent implements OnInit {
  @Output() select = new EventEmitter();
  @Input() selected: number[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['select', 'title', 'show'];
  dataSource = new MatTableDataSource<Question>();
  selection = new SelectionModel<Question>(true, []);

  constructor(
    private questionsService: QuestionsService,
    private subjectService: SubjectService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.questionsService
      .getAllBySubjectId(this.subjectService.subjectId)
      .subscribe(questions => {
        this.dataSource.data = questions;

        this.selectQuestions();
      });

    this.dataSource.paginator = this.paginator;
    this.applyCustomFilter();
  }

  private applyCustomFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const filterTags = filter.split(',');
      for (let i = 0; i < filterTags.length; i++) {
        if (!data.tags.toLowerCase().includes(filterTags[i].toLowerCase())) {
          continue;
        }
        if (i === filterTags.length - 1) {
          return true;
        }
      }
      return data.title.toLowerCase().includes(filter.toLowerCase());
    };
  }

  private selectQuestions() {
    if (!this.selected) {
      return;
    }
    const selectedQuestions = this.dataSource.data.filter(function(data) {
      return this.includes(data.id);
    }, this.selected);
    this.selection.select(...selectedQuestions);
    this.updateSelected();
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
        return q.id;
      })
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelect(row: Question) {
    this.selection.toggle(row);
    this.updateSelected();
  }

  private updateSelected() {
    this.select.emit(
      this.selection.selected.map(q => {
        return q.id;
      })
    );
  }

  showQuestion(id: number) {
    this.questionsService.getOne(id.toString()).subscribe(data => {
      this.dialog.open(ShowQuestionComponent, {
        data: data,
        autoFocus: false
      });
    });
  }
}
