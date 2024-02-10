import { Job } from "../../models/job.model";
import { JobQuery } from "../../models/query.model";

export class FetchJobs {
    static readonly type = "[Job Page] fetch jobs";
    public triggerError = false;
    constructor(triggerError: boolean) {
        this.triggerError = triggerError; 
    }
}

export class FetchJobsSuccess {
    static readonly type = "[Job API] fetch jobs success";
    constructor(public jobs: Job[]) {}
}

export class FetchJobsError {
    static readonly type = "[Job API] fetch jobs error";
    constructor(public error: unknown) {}
}


export class FilterJobs {
    static readonly type = "[Job Page] filter jobs";
    constructor(public query: JobQuery) {}
}
