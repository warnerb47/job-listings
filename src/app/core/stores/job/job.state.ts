import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Job } from "../../models/job.model";
import { JobGateway } from "../../ports/job.gateway";
import { Observable, catchError, of, tap, throwError } from "rxjs";
import { FetchJobs, FetchJobsError, FetchJobsSuccess } from "./job.action";

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

    @Action(FetchJobs)
    retrieveJobs(ctx: StateContext<JobStateModel>): Observable<Job[]> {
        return this.jobGateway.retrieveAll().pipe(
            tap(jobs => ctx.dispatch(new FetchJobsSuccess(jobs))),
            catchError((error) => {
                ctx.dispatch(new FetchJobsError(error));
                return of([]);
            }),
        );
    }

    @Action(FetchJobsSuccess)
    jobsRetrieves(ctx: StateContext<JobStateModel>, { jobs }: FetchJobsSuccess): void {
        ctx.patchState({jobs});
    }
}