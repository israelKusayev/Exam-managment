import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PossibleAnswerComponent } from './possible-answer.component';

describe('PossibleAnswerComponent', () => {
  let component: PossibleAnswerComponent;
  let fixture: ComponentFixture<PossibleAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PossibleAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PossibleAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
