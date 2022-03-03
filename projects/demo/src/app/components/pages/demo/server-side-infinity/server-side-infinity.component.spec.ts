import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerSideInfinityComponent } from './server-side-infinity.component';

describe('ServerSideInfinityComponent', () => {
  let component: ServerSideInfinityComponent;
  let fixture: ComponentFixture<ServerSideInfinityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerSideInfinityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerSideInfinityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
