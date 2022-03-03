import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTableBodyComponent } from './ag-table-body.component';

describe('AgTableBodyComponent', () => {
  let component: AgTableBodyComponent;
  let fixture: ComponentFixture<AgTableBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgTableBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgTableBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
