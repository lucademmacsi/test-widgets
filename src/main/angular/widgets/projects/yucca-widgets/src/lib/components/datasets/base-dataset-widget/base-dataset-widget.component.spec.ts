import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDatasetWidgetComponent } from './base-dataset-widget.component';

describe('BaseDatasetWidgetComponent', () => {
  let component: BaseDatasetWidgetComponent;
  let fixture: ComponentFixture<BaseDatasetWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseDatasetWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDatasetWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
