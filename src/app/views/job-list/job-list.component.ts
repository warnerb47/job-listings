import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { JobComponent } from './components/job/job.component';
import { JobGateway } from '../../core/ports/job.gateway';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private _jobGateway = inject(JobGateway);
  private store = inject(Store);
  jobs$ = this._jobGateway.retrieveAll();
  @Select((state: {job: JobStateModel}) => state.job.jobs) jobsSelector$!: Observable<Job[]>;
  hideFilter= true;
  
  queries = new BehaviorSubject<JobQuery>({
    languages: [],
    level: '',
    role: '',
    tools: [],
  });

  get queries$(): Observable<JobQuery>{
    return this.queries.asObservable();
  }
  ngOnInit(): void {
    this.store.dispatch(new FetchJobs());
  }

  filter(query: Partial<JobQuery>): void {
    this.store.dispatch(new AddQuery(query));
    this.store.dispatch(new FilterJobs());
    const payload = {...this.queries.value};
    payload.level = query?.level ?? payload.level;
    payload.role = query?.role ?? payload.role;
    payload.tools = [...payload.tools, ...query?.tools ?? []];
    payload.languages = [...payload.languages, ...query?.languages ?? []];
    this.queries.next({...this.queries.value, ...payload});
    this.jobs$ = this._jobGateway.filter(this.queries.value);
    this.hideFilter = false;
  }

  clearFilter(): void {
    this.store.dispatch(new ClearQuery());
    this.store.dispatch(new FilterJobs());
    this.queries.next({
      languages: [],
      level: '',
      role: '',
      tools: [],
    });
    this.jobs$ = this._jobGateway.filter(this.queries.value);
    this.hideFilter = true;
  }

  popFilter(partQuery: Partial<JobQuery>): void {
    this.store.dispatch(new RemoveQuery(partQuery));
    this.store.dispatch(new FilterJobs());
    const payload = {...this.queries.value};
    payload.level = payload.level === partQuery?.level ? '' : payload.level;
    payload.role = payload.role === partQuery?.role ? '' : payload.role;
    payload.tools = payload.tools.filter(t => !partQuery?.tools?.includes(t));
    payload.languages = payload.languages.filter(l => !partQuery?.languages?.includes(l));
    this.queries.next({...this.queries.value, ...payload});
    this.jobs$ = this._jobGateway.filter(this.queries.value);
    if (JSON.stringify(this.queries.value) === JSON.stringify({
      languages: [],
      level: '',
      role: '',
      tools: [],
    })) {
      this.hideFilter = true; 
    }
  }
}
