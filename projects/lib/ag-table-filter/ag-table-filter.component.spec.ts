import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTableFilterComponent } from './ag-table-filter.component';

describe('AgTableFilterComponent', () => {
  let component: AgTableFilterComponent;
  let fixture: ComponentFixture<AgTableFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgTableFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
