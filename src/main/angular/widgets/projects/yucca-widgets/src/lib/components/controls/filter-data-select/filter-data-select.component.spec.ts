import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDataSelectComponent } from './filter-data-select.component';

describe('FilterDataSelectComponent', () => {
  let component: FilterDataSelectComponent;
  let fixture: ComponentFixture<FilterDataSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDataSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDataSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
