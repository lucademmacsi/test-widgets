import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDatasetcolumnComponent } from './input-datasetcolumn.component';

describe('InputDatasetcolumnComponent', () => {
  let component: InputDatasetcolumnComponent;
  let fixture: ComponentFixture<InputDatasetcolumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDatasetcolumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDatasetcolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
