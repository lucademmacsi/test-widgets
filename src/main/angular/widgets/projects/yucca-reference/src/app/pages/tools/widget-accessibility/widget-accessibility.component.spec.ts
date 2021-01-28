import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetAccessibilityComponent } from './widget-accessibility.component';

describe('WidgetAccessibilityComponent', () => {
  let component: WidgetAccessibilityComponent;
  let fixture: ComponentFixture<WidgetAccessibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetAccessibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetAccessibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
