import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { JobComponent } from './components/job/job.component';
import { Observable, map } from 'rxjs';
import { JobQuery } from '../../core/models/query.model';
import { Select, Store } from '@ngxs/store';
import { FetchJobs, FilterJobs } from 'src/app/core/stores/job/job.action';
import { Job } from 'src/app/core/models/job.model';
import { JobStateModel } from 'src/app/core/stores/job/job.state';
import { AddQuery, ClearQuery, RemoveQuery } from 'src/app/core/stores/job/query.action';

@Component({
  selector: 'job-listings-job-list',
  standalone: true,
  imports: [CommonModule, FilterComponent, JobComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
})
export class JobListComponent implements OnInit {
  private store = inject(Store);
  @Select((state: { job: JobStateModel }) => state.job.jobs) jobs$!: Observable<Job[]>;
  @Select((state: { job: JobStateModel }) => state.job.query) queries$!: Observable<JobQuery>;
  hideFilter$ = this.queries$.pipe(
    map(query => JSON.stringify(query) === JSON.stringify({
      languages: [],
      level: '',
      role: '',
      tools: [],
    })),
  );

  ngOnInit(): void {
    this.store.dispatch(new FetchJobs());
  }

  filter(query: Partial<JobQuery>): void {
    this.store.dispatch([new AddQuery(query), new FilterJobs()]);
  }

  clearFilter(): void {
    this.store.dispatch([new ClearQuery(), new FilterJobs()]);
  }

  popFilter(partQuery: Partial<JobQuery>): void {
    this.store.dispatch([new RemoveQuery(partQuery), new FilterJobs()]);
  }
}
