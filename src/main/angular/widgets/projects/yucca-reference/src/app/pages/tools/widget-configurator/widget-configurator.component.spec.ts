import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetConfiguratorComponent } from './widget-configurator.component';

describe('WidgetConfiguratorComponent', () => {
  let component: WidgetConfiguratorComponent;
  let fixture: ComponentFixture<WidgetConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
