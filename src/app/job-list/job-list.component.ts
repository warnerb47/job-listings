import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { JobComponent } from '../job/job.component';
import { JobGateway } from '../core/ports/job.gateway';
import { BehaviorSubject, Observable } from 'rxjs';
import { JobQuery } from '../core/models/query.model';

@Component({
  selector: 'job-listings-job-list',
  standalone: true,
  imports: [CommonModule, FilterComponent, JobComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
})
export class JobListComponent {
  private _jobGateway = inject(JobGateway);
  jobs$ = this._jobGateway.retrieveAll();
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

  filter(query: Partial<JobQuery>): void {
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
