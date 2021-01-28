import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSelectsComponent } from './control-select.component';

describe('ControlSelectComponent', () => {
  let component: ControlSelectsComponent;
  let fixture: ComponentFixture<ControlSelectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlSelectsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSelectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
