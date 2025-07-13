import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoHistoryService } from '../../services/video-processor.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProcessorHistoryResponse } from '../../types/processor-history.type';
import { CommonModule } from '@angular/common';
import { VideoProcessingEventResponse, VideoProcessorEventRequest } from '../../types/video-processing-event.type';
import { OrchestratorService } from '../../services/orchestrator.service';


@Component({
  selector: 'app-video-processor',
  imports: [CommonModule, NavbarComponent],
  providers: [
    VideoHistoryService
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
  events: VideoProcessingEventResponse[] = [];
  isLoadingMock = false;


  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private service: VideoHistoryService,
    private serviceOrchestrator: OrchestratorService
  ) {}
  
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    const userId = localStorage.getItem('userID');

    if (userId) {
      this.service.getEventsByUser(userId).subscribe({
        next: (data) => this.events = data,
        error: (err) => console.error('Erro ao buscar eventos:', err)
      });
    } else {
      alert('Usuário não autenticado. Por favor, faça login.');
      // ou redirecionar para login
    }
    this.isLoadingMock = true;
  }

  onSubmit(form: HTMLFormElement, fileInput: HTMLInputElement): void {
    const files = fileInput.files;

      if (!files || files.length === 0) {
        this.showResult('Selecione pelo menos um arquivo de vídeo!', 'error');
        return;
      }

      this.showLoading(true);
      this.hideResult();

      const user = localStorage.getItem('user') || 'default_user';
      const events = Array.from(files).map(file => ({
        videoPath: `/videos/${file.name}`,
        videoName: file.name,
        outputDir: `/outputs/${file.name.replace(/\.[^/.]+$/, '')}`,
        user: user
      }));

     if (events.length === 1) {
      this.serviceOrchestrator.processSingle(events[0]).subscribe({
        next: response => {
          this.showResult(response, 'success');
          this.showLoading(false);
        },
        error: err => {
          this.showResult('Erro ao processar vídeo.', 'error');
          this.showLoading(false);
        }
      });
      } else {
        this.serviceOrchestrator.processBatch(events).subscribe({
          next: response => {
            this.showResult(response, 'success');
            this.showLoading(false);
          },
          error: err => {
            this.showResult('Erro ao processar vídeos em lote.', 'error');
            this.showLoading(false);
          }
        });
      }

  }

  sendSingleVideo() {
    const event: VideoProcessorEventRequest = {
      videoPath: '/videos/sample1.mp4',
      videoName: 'sample1.mp4',
      outputDir: '/outputs/sample1',
      user: localStorage.getItem('user') || 'default_user'
    };

    this.serviceOrchestrator.processSingle(event).subscribe(response => {
      console.log('Resposta:', response);
    });
  }

  sendBatchVideos() {
    const events: VideoProcessorEventRequest[] = [
      {
        videoPath: '/videos/sample2.mp4',
        videoName: 'sample2.mp4',
        outputDir: '/outputs/sample2',
        user: localStorage.getItem('userID') || 'default_user'
      },
      {
        videoPath: '/videos/sample3.mp4',
        videoName: 'sample3.mp4',
        outputDir: '/outputs/sample3',
        user: localStorage.getItem('userID') || 'default_user'
      }
    ];

    this.serviceOrchestrator.processBatch(events).subscribe(response => {
      console.log('Resposta em lote:', response);
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

// loadFilesList(): void {
//   this.service.getStatus().subscribe({
//     next: (data) => {
//       if (data.files && data.files.length > 0) {
//         this.files = data.files;
//       } else {
//         this.files = [];
//       }
//     },
//     error: () => {
//       this.files = [];
//     }
//   });
// }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

}
