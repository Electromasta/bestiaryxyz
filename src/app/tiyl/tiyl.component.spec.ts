import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiylComponent } from './tiyl.component';

describe('TiylComponent', () => {
  let component: TiylComponent;
  let fixture: ComponentFixture<TiylComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiylComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiylComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
