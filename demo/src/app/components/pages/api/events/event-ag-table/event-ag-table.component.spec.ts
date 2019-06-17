import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAgTableComponent } from './event-ag-table.component';

describe('EventAgTableComponent', () => {
  let component: EventAgTableComponent;
  let fixture: ComponentFixture<EventAgTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAgTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
