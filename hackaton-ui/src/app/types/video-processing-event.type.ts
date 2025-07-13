export enum VideoProcessingStatus {
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export type VideoProcessingEventResponse = {
  id: number;
  videoPath: string;
  videoName: string;
  outputDir: string;
  userID: string;
  queuedAt: string;
  completedAt: string | null;
  status: VideoProcessingStatus;
}

export type VideoProcessorEventRequest = {
  videoPath: string;
  videoName: string;
  outputDir: string;
  user: string;
};