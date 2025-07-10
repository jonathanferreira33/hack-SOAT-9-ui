import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedVideosComponent } from './processed-videos.component';

describe('ProcessedVideosComponent', () => {
  let component: ProcessedVideosComponent;
  let fixture: ComponentFixture<ProcessedVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessedVideosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessedVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
