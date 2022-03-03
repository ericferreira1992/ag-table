import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterOutletDefaultComponent } from './router-outlet-default.component';

describe('RouterOutletDefaultComponent', () => {
  let component: RouterOutletDefaultComponent;
  let fixture: ComponentFixture<RouterOutletDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterOutletDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterOutletDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
