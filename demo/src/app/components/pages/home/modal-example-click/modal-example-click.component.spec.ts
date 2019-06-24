import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExampleClickComponent } from './modal-example-click.component';

describe('ModalExampleClickComponent', () => {
  let component: ModalExampleClickComponent;
  let fixture: ComponentFixture<ModalExampleClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExampleClickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExampleClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
