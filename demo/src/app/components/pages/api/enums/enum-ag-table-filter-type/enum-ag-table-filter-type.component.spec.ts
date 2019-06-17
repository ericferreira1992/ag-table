import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumAgTableFilterTypeComponent } from './enum-ag-table-filter-type.component';

describe('EnumAgTableFilterTypeComponent', () => {
  let component: EnumAgTableFilterTypeComponent;
  let fixture: ComponentFixture<EnumAgTableFilterTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumAgTableFilterTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumAgTableFilterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
