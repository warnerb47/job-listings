import { Observable } from "rxjs";
import { Job } from "../models/job.model";

export abstract class JobGateway {
  abstract retrieveAll(): Observable<Job[]>;

  abstract filter(query: string[]): Observable<Job[]>;

}