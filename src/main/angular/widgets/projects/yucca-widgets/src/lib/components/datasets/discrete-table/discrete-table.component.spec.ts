import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteTableComponent } from './discrete-table.component';

describe('DiscreteTableComponent', () => {
  let component: DiscreteTableComponent;
  let fixture: ComponentFixture<DiscreteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscreteTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscreteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
