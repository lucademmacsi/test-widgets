import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallCustomComponent } from './install-custom.component';

describe('InstallCustomComponent', () => {
  let component: InstallCustomComponent;
  let fixture: ComponentFixture<InstallCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
