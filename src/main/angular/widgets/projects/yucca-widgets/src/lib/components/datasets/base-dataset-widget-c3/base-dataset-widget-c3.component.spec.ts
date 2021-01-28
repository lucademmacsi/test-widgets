import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDatasetWidgetC3Component } from './base-dataset-widget-c3.component';

describe('BaseDatasetWidgetC3Component', () => {
  let component: BaseDatasetWidgetC3Component;
  let fixture: ComponentFixture<BaseDatasetWidgetC3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDatasetWidgetC3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDatasetWidgetC3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
