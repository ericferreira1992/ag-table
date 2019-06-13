import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureAgTableHeaderComponent } from './structure-ag-table-header.component';

describe('StructureAgTableHeaderComponent', () => {
  let component: StructureAgTableHeaderComponent;
  let fixture: ComponentFixture<StructureAgTableHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureAgTableHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureAgTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
