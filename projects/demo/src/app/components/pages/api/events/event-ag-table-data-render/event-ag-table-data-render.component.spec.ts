import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAgTableDataRenderComponent } from './event-ag-table-data-render.component';

describe('EventAgTableDataRenderComponent', () => {
  let component: EventAgTableDataRenderComponent;
  let fixture: ComponentFixture<EventAgTableDataRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAgTableDataRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAgTableDataRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
