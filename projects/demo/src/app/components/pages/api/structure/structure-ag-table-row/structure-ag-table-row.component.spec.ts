import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureAgTableRowComponent } from './structure-ag-table-row.component';

describe('StructureAgTableRowComponent', () => {
  let component: StructureAgTableRowComponent;
  let fixture: ComponentFixture<StructureAgTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureAgTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureAgTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
