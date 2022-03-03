import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureAgTableBodyComponent } from './structure-ag-table-body.component';

describe('StructureAgTableBodyComponent', () => {
  let component: StructureAgTableBodyComponent;
  let fixture: ComponentFixture<StructureAgTableBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureAgTableBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureAgTableBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
