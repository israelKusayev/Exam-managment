import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReviewComponent } from './test-review.component';

describe('TestReviewComponent', () => {
  let component: TestReviewComponent;
  let fixture: ComponentFixture<TestReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
