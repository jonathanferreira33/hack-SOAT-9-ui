import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hackaton-ui';
}
