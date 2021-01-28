import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataexplorerTableComponent } from './dataexplorer-table.component';

describe('DataexplorerTableComponent', () => {
  let component: DataexplorerTableComponent;
  let fixture: ComponentFixture<DataexplorerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataexplorerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataexplorerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
