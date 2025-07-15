import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  imports: [NgIf, AsyncPipe],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  
})
export class LoadingSpinnerComponent {

  constructor(private loadingService: LoadingService) {}

    get isLoading$() {
    return this.loadingService.loading$;
  }
}
