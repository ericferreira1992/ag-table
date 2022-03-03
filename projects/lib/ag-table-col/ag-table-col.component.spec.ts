import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTableColComponent } from './ag-table-col.component';

describe('AgTableColComponent', () => {
  let component: AgTableColComponent;
  let fixture: ComponentFixture<AgTableColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgTableColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgTableColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
