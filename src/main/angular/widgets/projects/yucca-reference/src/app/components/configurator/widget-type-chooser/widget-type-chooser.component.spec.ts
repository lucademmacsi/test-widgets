import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTypeChooserComponent } from './widget-type-chooser.component';

describe('WidgetTypeChooserComponent', () => {
  let component: WidgetTypeChooserComponent;
  let fixture: ComponentFixture<WidgetTypeChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetTypeChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTypeChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
