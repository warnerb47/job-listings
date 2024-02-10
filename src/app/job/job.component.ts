import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../core/models/job.model';
import { JobQuery } from '../core/models/query.model';

@Component({
  selector: 'job-listings-job',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss',
})
export class JobComponent {
  @Input() job!: Job;
  @Output() query = new EventEmitter<Partial<JobQuery>>();

  filter(q: Partial<JobQuery>): void {
    this.query.emit(q);
  }
}
