import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersCustomFilterComponent } from './others-custom-filter.component';

describe('OthersCustomFilterComponent', () => {
  let component: OthersCustomFilterComponent;
  let fixture: ComponentFixture<OthersCustomFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersCustomFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersCustomFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
