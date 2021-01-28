import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTenantcodeComponent } from './input-tenantcode.component';

describe('InputTenantcodeComponent', () => {
  let component: InputTenantcodeComponent;
  let fixture: ComponentFixture<InputTenantcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTenantcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTenantcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
