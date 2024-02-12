import { Observable, map, of } from "rxjs";
import { Job } from "../models/job.model";
import { JobGateway } from "../ports/job.gateway";
import data from "../../../assets/json/data.json";
import { JobQuery } from "../models/query.model";

export class InMemoryJobGateway extends JobGateway {
    
    jobs: Job[] = data || [];

    withJobs(jobs: Job[]): InMemoryJobGateway {
        this.jobs = jobs;
        return this;
      }

    override retrieveAll(): Observable<Job[]> {
        return of(this.jobs);
    }

    override filter(query: JobQuery): Observable<Job[]> {
        return of(this.jobs).pipe(
            map(jobs => jobs.filter(j => {
                const includeLanguage  = query.languages.every( l => j.languages.includes(l));
                const includeTools = query.tools.every(t => j.tools.includes(t));
                return (
                    j.role.includes(query.role)
                    && j.level.includes(query.level)
                    && includeLanguage
                    && includeTools
                );
            })),
        )
    }
}