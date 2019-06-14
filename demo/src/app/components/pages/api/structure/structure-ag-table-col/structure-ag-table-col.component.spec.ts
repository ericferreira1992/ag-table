import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureAgTableColComponent } from './structure-ag-table-col.component';

describe('StructureAgTableColComponent', () => {
  let component: StructureAgTableColComponent;
  let fixture: ComponentFixture<StructureAgTableColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureAgTableColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureAgTableColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
