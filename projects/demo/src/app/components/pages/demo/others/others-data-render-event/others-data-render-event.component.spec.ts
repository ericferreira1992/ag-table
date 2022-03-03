import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersDataRenderEventComponent } from './others-data-render-event.component';

describe('OthersDataRenderEventComponent', () => {
  let component: OthersDataRenderEventComponent;
  let fixture: ComponentFixture<OthersDataRenderEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersDataRenderEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersDataRenderEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
