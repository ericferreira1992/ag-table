import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTablePaginateComponent } from './ag-table-paginate.component';

describe('AgTablePaginateComponent', () => {
  let component: AgTablePaginateComponent;
  let fixture: ComponentFixture<AgTablePaginateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgTablePaginateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgTablePaginateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
