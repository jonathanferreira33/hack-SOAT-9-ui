import { TestBed } from '@angular/core/testing';

import { ProcessedVideosService } from './processed-videos.service';

describe('ProcessedVideosService', () => {
  let service: ProcessedVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessedVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
