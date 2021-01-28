import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetParamConfigComponent } from './widget-param-config.component';

describe('WidgetParamConfigComponent', () => {
  let component: WidgetParamConfigComponent;
  let fixture: ComponentFixture<WidgetParamConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetParamConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetParamConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
