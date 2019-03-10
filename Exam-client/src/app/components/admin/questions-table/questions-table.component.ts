import { ToastrService } from 'ngx-toastr';
import { SubjectService } from './../../../services/subject.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  MatSort,
  MatTableDataSource,
  MatPaginator,
  MatDialog
} from '@angular/material';
import { Question } from 'src/app/models/question';
import { Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { ShowQuestionComponent } from '../show-question/show-question.component';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.scss']
})
export class QuestionsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'questionTextAndTags',
    'lastUpdate',
    'questionType',
    'testsCount',
    'actions'
  ];

  dataSource = new MatTableDataSource<Question>();
  sort;
  @ViewChild(MatSort) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  constructor(
    private router: Router,
    private questionsService: QuestionsService,
    private subjectService: SubjectService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.questionsService
      .getAllBySubjectId(this.subjectService.subjectId)
      .subscribe(data => {
        this.dataSource.data = data;
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      });

    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (question, filter) => {
      return this.textFilter(question.title + ' ' + question.tags, filter);
    };
  }

  textFilter(text: string, filter: string): boolean {
    if (filter == null) {
      return true;
    }
    if (text == null) {
      return false;
    }
    const words = filter.split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i].trim().toLowerCase();
      if (!text.includes(word)) {
        return false;
      }
    }
    return true;
  }

  edit(id: number) {
    this.router.navigate(['manage-questions/edit/', id]);
  }

  delete(id: number) {
    this.questionsService.delete(id.toString()).subscribe(data => {
      this.dataSource.data = this.dataSource.data.filter(d => d.id !== id);
      this.toast.info('question deleted successfully');
    });
  }

  show(id: number) {
    this.questionsService.getOne(id.toString()).subscribe(data => {
      this.dialog.open(ShowQuestionComponent, {
        data: data,
        autoFocus: false
      });
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
