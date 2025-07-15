import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoHistoryService } from '../../services/video-processor.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProcessorHistoryResponse } from '../../types/processor-history.type';
import { CommonModule } from '@angular/common';
import { VideoProcessingEventResponse, VideoProcessorEventRequest } from '../../types/video-processing-event.type';
import { OrchestratorService } from '../../services/orchestrator.service';
import { ToastrService } from 'ngx-toastr';


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
    private serviceOrchestrator: OrchestratorService,
    private toastr: ToastrService
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
      alert('ERRO AO PROCESSAR VÍDEO');
      // ou redirecionar para login
    }
    this.isLoadingMock = true;
  }

  onSubmit(event: Event, fileInput: HTMLInputElement): void {
    console.log('Form submitted');
    event.preventDefault();
    const files = fileInput.files;

      if (!files || files.length === 0) {
        this.toastr.error('Selecione pelo menos um arquivo de vídeo!', 'error');
        return;
      }

      this.showLoading(true);
      this.hideResult();
      

      const user = localStorage.getItem('username') || 'default_user';
      const events = Array.from(files).map(file => ({
        videoPath: `/videos/${file.name}`,
        videoName: file.name,
        outputDir: `/outputs/${file.name.replace(/\.[^/.]+$/, '')}`,
        user: user
      }));

      this.mockProcessedFiles = events.map(event => ({
        name: event.videoName,
        date: new Date().toLocaleString(),
        status: 'processing'
      }));

      this.isLoadingMock = false;

     if (events.length === 1) {
      this.serviceOrchestrator.processSingle(events[0]).subscribe({
        next: response => {
          this.showLoading(false);
          this.toastr.success('Vídeo enviado para a fila de processamento com sucesso!');
        },
        error: err => {
          this.showLoading(false);
          this.toastr.error('Erro ao processar vídeo.');
        }
        });
      } else {
        this.serviceOrchestrator.processBatch(events).subscribe({
          next: response => {
            this.showLoading(false);
            this.toastr.success('Vídeos enviados para a fila de processamento com sucesso!');
          },
          error: err => {
            this.showLoading(false);
            this.toastr.error('Erro ao processar vídeos em lote.');
          }
      });
    }
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
