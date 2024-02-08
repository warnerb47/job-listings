import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { JobComponent } from '../job/job.component';

@Component({
  selector: 'job-listings-job-list',
  standalone: true,
  imports: [CommonModule, FilterComponent, JobComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
})
export class JobListComponent {}
