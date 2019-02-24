import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickNavigationComponent } from './quick-navigation.component';

describe('QuickNavigationComponent', () => {
  let component: QuickNavigationComponent;
  let fixture: ComponentFixture<QuickNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
