import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VideoProcessingEventResponse } from '../types/video-processing-event.type';

@Injectable({
  providedIn: 'root'
})
export class VideoHistoryService {

  private baseUrl = 'http://localhost:8081/api/v1/processing-events';
  
  constructor(private http: HttpClient) {}


  getEventsByUser(userId: string): Observable<VideoProcessingEventResponse[]> {
    return this.http.get<VideoProcessingEventResponse[]>(`${this.baseUrl}/user/${userId}`);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message || 'Erro desconhecido'));
  }
}
