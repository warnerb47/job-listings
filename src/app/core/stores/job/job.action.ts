import { Job } from "../../models/job.model";

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
