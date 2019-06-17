import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumAgTableFilterModeComponent } from './enum-ag-table-filter-mode.component';

describe('EnumAgTableFilterModeComponent', () => {
  let component: EnumAgTableFilterModeComponent;
  let fixture: ComponentFixture<EnumAgTableFilterModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumAgTableFilterModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumAgTableFilterModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
