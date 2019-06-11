import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTableHeaderComponent } from './ag-table-header.component';

describe('AgTableHeaderComponent', () => {
  let component: AgTableHeaderComponent;
  let fixture: ComponentFixture<AgTableHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgTableHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
