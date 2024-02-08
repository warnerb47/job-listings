import { Component } from '@angular/core';
import { JobListComponent } from './job-list/job-list.component';
import { HeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  imports: [JobListComponent, HeaderComponent],
  selector: 'job-listings-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'job-listings';
}
