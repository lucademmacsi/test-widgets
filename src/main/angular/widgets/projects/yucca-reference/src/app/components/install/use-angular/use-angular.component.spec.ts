import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseAngularComponent } from './use-angular.component';

describe('UseAngularComponent', () => {
  let component: UseAngularComponent;
  let fixture: ComponentFixture<UseAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
