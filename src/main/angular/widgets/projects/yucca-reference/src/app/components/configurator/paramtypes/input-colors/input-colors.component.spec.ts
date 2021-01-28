import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputColorsComponent } from './input-colors.component';

describe('InputColorsComponent', () => {
  let component: InputColorsComponent;
  let fixture: ComponentFixture<InputColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
