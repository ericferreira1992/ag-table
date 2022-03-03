import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTableCellComponent } from './ag-table-cell.component';

describe('AgTableCellComponent', () => {
  let component: AgTableCellComponent;
  let fixture: ComponentFixture<AgTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
