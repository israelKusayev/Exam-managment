import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTestsComponent } from './manage-tests.component';

describe('ManageTestsComponent', () => {
  let component: ManageTestsComponent;
  let fixture: ComponentFixture<ManageTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
