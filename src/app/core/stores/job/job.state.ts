import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";
import { Job } from "../../models/job.model";

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
export class JobState {}