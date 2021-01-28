import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDatasetcodeComponent } from './input-datasetcode.component';

describe('InputDatasetcodeComponent', () => {
  let component: InputDatasetcodeComponent;
  let fixture: ComponentFixture<InputDatasetcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDatasetcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDatasetcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
