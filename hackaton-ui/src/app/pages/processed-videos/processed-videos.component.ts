import { Component } from '@angular/core';
import { ProcessedVideosService } from '../../services/processed-videos.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-processed-videos',
  imports: [NavbarComponent],
  templateUrl: './processed-videos.component.html',
  styleUrl: './processed-videos.component.scss'
})
export class ProcessedVideosComponent {

  constructor (private service: ProcessedVideosService) {}

}
