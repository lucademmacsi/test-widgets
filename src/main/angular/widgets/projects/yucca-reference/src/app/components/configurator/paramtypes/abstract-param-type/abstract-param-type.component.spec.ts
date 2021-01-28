import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractParamTypeComponent } from './abstract-param-type.component';

describe('AbstractParamTypeComponent', () => {
  let component: AbstractParamTypeComponent;
  let fixture: ComponentFixture<AbstractParamTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractParamTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractParamTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
