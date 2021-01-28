import { TestBed } from '@angular/core/testing';

import { YuccaWidgetsService } from './yucca-widgets.service';

describe('YuccaWidgetsService', () => {
  let service: YuccaWidgetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YuccaWidgetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
