import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDataComponent } from './singledata.component';

describe('SingleDataComponent', () => {
  let component: SingleDataComponent;
  let fixture: ComponentFixture<SingleDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
