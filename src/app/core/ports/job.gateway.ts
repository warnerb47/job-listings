import { Observable } from "rxjs";
import { Job } from "../models/job.model";
import { JobQuery } from "../models/query.model";

export abstract class JobGateway {
  abstract retrieveAll(): Observable<Job[]>;

  abstract filter(query: JobQuery): Observable<Job[]>;

}