import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XgteComponent } from './xgte.component';

describe('XgteComponent', () => {
  let component: XgteComponent;
  let fixture: ComponentFixture<XgteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XgteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XgteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
