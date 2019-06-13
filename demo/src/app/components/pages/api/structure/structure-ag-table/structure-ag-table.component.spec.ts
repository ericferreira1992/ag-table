import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureAgTableComponent } from './structure-ag-table.component';

describe('StructureAgTableComponent', () => {
  let component: StructureAgTableComponent;
  let fixture: ComponentFixture<StructureAgTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureAgTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureAgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
