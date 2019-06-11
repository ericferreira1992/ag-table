import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTableComponent } from './ag-table.component';

describe('AgTableComponent', () => {
  let component: AgTableComponent;
  let fixture: ComponentFixture<AgTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
