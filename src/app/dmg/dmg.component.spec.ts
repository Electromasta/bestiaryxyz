import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmgComponent } from './dmg.component';

describe('DmgComponent', () => {
  let component: DmgComponent;
  let fixture: ComponentFixture<DmgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
