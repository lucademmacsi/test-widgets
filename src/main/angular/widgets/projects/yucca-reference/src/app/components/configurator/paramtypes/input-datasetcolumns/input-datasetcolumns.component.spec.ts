import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDatasetcolumnsComponent } from './input-datasetcolumns.component';

describe('InputDatasetcolumnsComponent', () => {
  let component: InputDatasetcolumnsComponent;
  let fixture: ComponentFixture<InputDatasetcolumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDatasetcolumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDatasetcolumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
