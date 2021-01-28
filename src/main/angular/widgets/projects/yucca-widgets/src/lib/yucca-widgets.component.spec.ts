import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YuccaWidgetsComponent } from './yucca-widgets.component';

describe('YuccaWidgetsComponent', () => {
  let component: YuccaWidgetsComponent;
  let fixture: ComponentFixture<YuccaWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YuccaWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YuccaWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
