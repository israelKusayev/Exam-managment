import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentTestResultsComponent } from './respondent-test-results.component';

describe('RespondentTestResultsComponent', () => {
  let component: RespondentTestResultsComponent;
  let fixture: ComponentFixture<RespondentTestResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentTestResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentTestResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
