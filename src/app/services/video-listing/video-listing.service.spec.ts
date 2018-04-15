import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { VideoListingService } from './video-listing.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('VideoListingService', () => {
  let injector: TestBed;
  let videoListingService: VideoListingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VideoListingService]
    });
    injector = getTestBed();
    videoListingService = injector.get(VideoListingService);
  });

  it('should be created', () => {
    expect(videoListingService).toBeTruthy();
  });
});
