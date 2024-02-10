import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { JobComponent } from '../job/job.component';
import { JobGateway } from '../core/ports/job.gateway';
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Job } from '../core/models/job.model';
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
    console.log(payload);
    this.queries.next({...this.queries.value, ...payload});
    this.jobs$ = this._jobGateway.filter(this.queries.value);
  }
}
