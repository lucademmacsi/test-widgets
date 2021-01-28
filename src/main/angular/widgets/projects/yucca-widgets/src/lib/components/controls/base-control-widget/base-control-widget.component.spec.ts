import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseControlWidgetComponent } from './base-control-widget.component';

describe('BaseControlWidgetComponent', () => {
  let component: BaseControlWidgetComponent;
  let fixture: ComponentFixture<BaseControlWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseControlWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseControlWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
