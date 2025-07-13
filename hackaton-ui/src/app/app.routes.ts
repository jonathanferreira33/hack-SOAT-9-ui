import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'video-processor',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'video-processor',
    loadComponent: () => import('./pages/video-processor/video-processor.component').then(m => m.VideoProcessorComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'processed-videos',
    loadComponent: () => import('./pages/processed-videos/processed-videos.component').then(m => m.ProcessedVideosComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'video-processor'
  }
];
