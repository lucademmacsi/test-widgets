import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscretebarChartComponent } from './discretebar-chart.component';

describe('DiscretebarChartComponent', () => {
  let component: DiscretebarChartComponent;
  let fixture: ComponentFixture<DiscretebarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscretebarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscretebarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
