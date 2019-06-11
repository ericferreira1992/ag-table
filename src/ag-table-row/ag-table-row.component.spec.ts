import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTableRowComponent } from './ag-table-row.component';

describe('AgTableRowComponent', () => {
  let component: AgTableRowComponent;
  let fixture: ComponentFixture<AgTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
