import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTableSpinnerComponent } from './ag-table-spinner.component';

describe('AgTableSpinnerComponent', () => {
  let component: AgTableSpinnerComponent;
  let fixture: ComponentFixture<AgTableSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgTableSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgTableSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
