import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDatasetWidgetAxisC3Component } from './base-dataset-widget-axis-c3.component';

describe('BaseDatasetWidgetAxisC3Component', () => {
  let component: BaseDatasetWidgetAxisC3Component;
  let fixture: ComponentFixture<BaseDatasetWidgetAxisC3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDatasetWidgetAxisC3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDatasetWidgetAxisC3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
