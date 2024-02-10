import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Job } from "../../models/job.model";
import { JobGateway } from "../../ports/job.gateway";
import { Observable, catchError, map, of, tap } from "rxjs";
import { FetchJobs, FetchJobsError, FetchJobsSuccess } from "./job.action";

export interface JobStateModel {
    jobs: Job[];
    error: unknown;
}

export const JobStateModelDefaults: JobStateModel = {
    jobs: [],
    error: null,
};

@State<JobStateModel>({
    name: 'job',
    defaults: JobStateModelDefaults,
})
@Injectable()
export class JobState {

    jobGateway = inject(JobGateway);

    @Action(FetchJobs)
    onFetchJobs(ctx: StateContext<JobStateModel>, {triggerError}: FetchJobs): Observable<Job[]> {
        return this.jobGateway.retrieveAll().pipe(
            map((jobs) => {
                if (triggerError) {
                    throw new Error('triggered error');
                }
                return jobs;
            }),
            tap(jobs => ctx.dispatch(new FetchJobsSuccess(jobs))),
            catchError((error) => {
                ctx.dispatch(new FetchJobsError(error));
                return of([]);
            }),
        );
    }

    @Action(FetchJobsSuccess)
    onFetchJobsSuccess(ctx: StateContext<JobStateModel>, {jobs}: FetchJobsSuccess): void {
        ctx.patchState({jobs});
    }

    @Action(FetchJobsError)
    onFetchJobsError(ctx: StateContext<JobStateModel>, {error}: FetchJobsError): void {
        ctx.patchState({error});
    }
}