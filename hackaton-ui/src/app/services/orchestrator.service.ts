import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VideoProcessorEventRequest } from '../types/video-processing-event.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrchestratorService {

  private apiUrl = 'http://localhost:8081/api/v1/orchestrator';

  constructor(private http: HttpClient) {}

  processSingle(event: VideoProcessorEventRequest): Observable<string> {
    return this.http.post(`${this.apiUrl}/process`, event, { responseType: 'text' });
  }

  processBatch(events: VideoProcessorEventRequest[]): Observable<string> {
    return this.http.post(`${this.apiUrl}/enqueue/batch`, events, { responseType: 'text' });
  }
}
