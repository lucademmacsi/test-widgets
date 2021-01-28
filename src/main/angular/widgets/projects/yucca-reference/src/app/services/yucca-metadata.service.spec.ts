import { TestBed } from '@angular/core/testing';

import { YuccaMetadataService } from './yucca-metadata.service';

describe('YuccaMetadataService', () => {
  let service: YuccaMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YuccaMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
