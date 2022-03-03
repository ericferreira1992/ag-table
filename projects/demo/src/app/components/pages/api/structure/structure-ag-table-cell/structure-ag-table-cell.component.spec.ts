import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureAgTableCellComponent } from './structure-ag-table-cell.component';

describe('StructureAgTableCellComponent', () => {
  let component: StructureAgTableCellComponent;
  let fixture: ComponentFixture<StructureAgTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureAgTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureAgTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
