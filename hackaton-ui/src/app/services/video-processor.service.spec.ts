import { TestBed } from '@angular/core/testing';

import { VideoHistoryService } from './video-processor.service';

describe('VideoProcessorService', () => {
  let service: VideoHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
