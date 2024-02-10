import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Job } from "../../models/job.model";
import { RetrieveJobs } from "./job.action";
import { JobGateway } from "../../ports/job.gateway";
import { Observable, tap } from "rxjs";

export interface JobStateModel {
    jobs: Job[];
}

@State<JobStateModel>({
    name: 'job',
    defaults: {
        jobs: []
    }
})
@Injectable()
export class JobState {

    jobGateway = inject(JobGateway);

    @Action(RetrieveJobs)
    retrieveJobs(ctx: StateContext<JobStateModel>): Observable<Job[]> {
        return this.jobGateway.retrieveAll().pipe(
            tap(jobs => ctx.patchState({jobs})),
        );
    }
}