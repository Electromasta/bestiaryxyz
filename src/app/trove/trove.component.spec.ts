import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroveComponent } from './trove.component';

describe('TroveComponent', () => {
  let component: TroveComponent;
  let fixture: ComponentFixture<TroveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
