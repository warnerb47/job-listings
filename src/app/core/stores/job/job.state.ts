import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Job } from "../../models/job.model";
import { JobGateway } from "../../ports/job.gateway";
import { Observable, catchError, of, tap } from "rxjs";
import { FetchJobs, FetchJobsError, FetchJobsSuccess, FilterJobs } from "./job.action";
import { JobQuery } from "../../models/query.model";
import { AddQuery, ClearQuery, RemoveQuery } from "./query.action";

export interface JobStateModel {
    jobs: Job[];
    error: unknown;
    query: JobQuery;
}

export const JobStateModelDefaults: JobStateModel = {
    jobs: [],
    error: null,
    query: {
        languages: [],
        level: '',
        role: '',
        tools: [],
    }
};

@State<JobStateModel>({
    name: 'job',
    defaults: JobStateModelDefaults,
})
@Injectable()
export class JobState {

    jobGateway = inject(JobGateway);

    @Action(FetchJobs)
    onFetchJobs(ctx: StateContext<JobStateModel>): Observable<Job[]> {
        return this.jobGateway.retrieveAll().pipe(
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



    @Action(FilterJobs)
    onFilterJobs(ctx: StateContext<JobStateModel>, {query}: FilterJobs): Observable<Job[]> {
        return this.jobGateway.filter(query).pipe(
            tap(jobs => ctx.dispatch(new FetchJobsSuccess(jobs))),
            catchError((error) => {
                ctx.dispatch(new FetchJobsError(error));
                return of([]);
            }),
        );
    }

    @Action(AddQuery)
    onAddQuery(ctx: StateContext<JobStateModel>, {partQuery}: AddQuery): JobQuery {
        const query = {...ctx.getState().query};
        query.level = partQuery?.level ?? query.level;
        query.role = partQuery?.role ?? query.role;
        query.tools = [...query.tools, ...partQuery?.tools ?? []];
        query.languages = [...query.languages, ...partQuery?.languages ?? []];
        ctx.patchState({query});
        return query;
    }

    @Action(RemoveQuery)
    onRemoveQuery(ctx: StateContext<JobStateModel>, {partQuery}: RemoveQuery): JobQuery {
        const query = {...ctx.getState().query};
        query.level = query.level === partQuery?.level ? '' : query.level;
        query.role = query.role === partQuery?.role ? '' : query.role;
        query.tools = query.tools.filter(t => !partQuery?.tools?.includes(t));
        query.languages = query.languages.filter(l => !partQuery?.languages?.includes(l));
        ctx.patchState({query});
        return query;
    }

    @Action(ClearQuery)
    onClearQuery(ctx: StateContext<JobStateModel>): JobQuery {
        const query = {
            languages: [],
            level: '',
            role: '',
            tools: [],
        };
        ctx.patchState({query});
        return query;
    }
}