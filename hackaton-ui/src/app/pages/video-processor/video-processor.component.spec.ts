import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoProcessorComponent } from './video-processor.component';

describe('VideoProcessorComponent', () => {
  let component: VideoProcessorComponent;
  let fixture: ComponentFixture<VideoProcessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoProcessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
