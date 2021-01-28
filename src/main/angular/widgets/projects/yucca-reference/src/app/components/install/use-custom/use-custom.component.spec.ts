import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCustomComponent } from './use-custom.component';

describe('UseCustomComponent', () => {
  let component: UseCustomComponent;
  let fixture: ComponentFixture<UseCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
