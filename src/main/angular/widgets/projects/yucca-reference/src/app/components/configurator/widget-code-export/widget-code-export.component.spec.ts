import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetCodeExportComponent } from './widget-code-export.component';

describe('WidgetCodeExportComponent', () => {
  let component: WidgetCodeExportComponent;
  let fixture: ComponentFixture<WidgetCodeExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetCodeExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetCodeExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
