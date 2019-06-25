import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersUnequealRowHeightComponent } from './others-unequal-row-height.component';

describe('OthersUnequealRowHeightComponent', () => {
  let component: OthersUnequealRowHeightComponent;
  let fixture: ComponentFixture<OthersUnequealRowHeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersUnequealRowHeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersUnequealRowHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
