import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideLeftBarComponent } from './side-left-bar.component';

describe('SideLeftBarComponent', () => {
  let component: SideLeftBarComponent;
  let fixture: ComponentFixture<SideLeftBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideLeftBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideLeftBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
