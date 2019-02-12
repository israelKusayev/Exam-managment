import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsTableComponent } from './tests-table.component';

describe('TestsTableComponent', () => {
  let component: TestsTableComponent;
  let fixture: ComponentFixture<TestsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
