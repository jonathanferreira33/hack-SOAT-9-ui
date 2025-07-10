import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoProcessorService } from '../../services/video-processor.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProcessorHistoryResponse } from '../../types/processor-history.type';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-video-processor',
  imports: [CommonModule, NavbarComponent],
  providers: [
    VideoProcessorService
  ],
  templateUrl: './video-processor.component.html',
  styleUrl: './video-processor.component.scss'
})
export class VideoProcessorComponent implements OnInit, AfterViewInit{
  loading = false;
  resultMessage = '';
  resultClass = '';
  files: any[] = [];
  mockProcessedFiles: ProcessorHistoryResponse[] = [];


  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private service: VideoProcessorService) {}
  
  ngAfterViewInit(): void {
      this.loadFilesList();
  }

  ngOnInit(): void {

    this.loadFilesList();
    this.loadMockFiles();
  }

onSubmit(form: HTMLFormElement, fileInput: HTMLInputElement): void {
  const file = fileInput.files?.[0];

  if (!file) {
    this.showResult('Selecione um arquivo de vídeo!', 'error');
    return;
  }

  const formData = new FormData();
  formData.append('video', file);

  this.showLoading(true);
  this.hideResult();

  this.service.uploadVideo(formData).subscribe({
    next: (result) => {
      if (result.success) {
        this.showResult(
          `${result.message}<br><br><a href="/download/${result.zip_path}" class="download-btn">⬇️ Download ZIP</a>`,
          'success'
        );
        this.loadFilesList();
      } else {
        this.showResult('Erro: ' + result.message, 'error');
      }
    },
    error: (err: Error) => {
      this.showResult('Erro de conexão: ' + err.message, 'error');
    },
    complete: () => {
      this.showLoading(false);
    }
  });
}

  showResult(message: string, type: string): void {
    this.resultMessage = message;
    this.resultClass = `result ${type}`;
  }

  hideResult(): void {
    this.resultMessage = '';
    this.resultClass = '';
  }

  showLoading(show: boolean): void {
    this.loading = show;
  }

loadFilesList(): void {
  this.service.getStatus().subscribe({
    next: (data) => {
      if (data.files && data.files.length > 0) {
        this.files = data.files;
      } else {
        this.files = [];
      }
    },
    error: () => {
      this.files = [];
    }
  });
}

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

isLoadingMock = true;

  loadMockFiles(): void {
    setTimeout(() => {
      this.mockProcessedFiles = [
        { name: 'video_01.zip', date: '2025-07-07 21:00', status: 'success' },
        { name: 'video_02.zip', date: '2025-07-07 21:05', status: 'processing' },
        { name: 'video_03.zip', date: '2025-07-07 21:10', status: 'error' }
      ];
      this.isLoadingMock = false;
    }, 1000);
  }

}
