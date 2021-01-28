import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallAngularComponent } from './install-angular.component';

describe('InstallAngularComponent', () => {
  let component: InstallAngularComponent;
  let fixture: ComponentFixture<InstallAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
