import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalMultiBarChartComponent } from './horizontalmultibar-chart.component';

describe('HorizontalMultiBarChartComponent', () => {
  let component: HorizontalMultiBarChartComponent;
  let fixture: ComponentFixture<HorizontalMultiBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalMultiBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalMultiBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
