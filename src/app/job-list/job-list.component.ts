import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { JobComponent } from '../job/job.component';
import { JobGateway } from '../core/ports/job.gateway';
import { toSignal } from "@angular/core/rxjs-interop";
import { tap } from 'rxjs';

@Component({
  selector: 'job-listings-job-list',
  standalone: true,
  imports: [CommonModule, FilterComponent, JobComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
})
export class JobListComponent {
  private _jobGateway = inject(JobGateway);

  jobs = toSignal(
    this._jobGateway.retrieveAll()
    .pipe(tap(d => console.log(d))), {
    initialValue: [],
  });
}
