import { Observable, map, of, startWith } from "rxjs";
import { Job } from "../models/job.model";
import { JobGateway } from "../ports/job.gateway";
import data from "../../../assets/json/data.json";

export class InMemoryJobGateway extends JobGateway {
    
    jobs: Job[] = data;

    override retrieveAll(): Observable<Job[]> {
        return of(this.jobs);
    }

    override filter(query: string[]): Observable<Job[]> {
        return of(this.jobs).pipe(
            startWith([]),
            map(jobs => jobs.filter(j => {
                const includeLanguage  = j.languages.some( l => query.includes(l));
                const includeTools = j.tools.some(t => query.includes(t));
                return (
                    query.includes(j.role)
                    || query.includes(j.level)
                    || includeLanguage
                    || includeTools
                );
            }))
        )
    }
}