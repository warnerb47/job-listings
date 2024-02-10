import { createPropertySelectors, createSelector } from "@ngxs/store";
import { JobState, JobStateModel } from "./job.state";

export class JobSelectors {
    static slices = createPropertySelectors<JobStateModel>(JobState);
    static filter() {
        return createSelector(
            [JobSelectors.slices.jobs, JobSelectors.slices.query],
            (jobs, query) => jobs.filter(j => {
                const includeLanguage = query.languages.every(l => j.languages.includes(l));
                const includeTools = query.tools.every(t => j.tools.includes(t));
                return (
                    j.role.includes(query.role)
                    && j.level.includes(query.level)
                    && includeLanguage
                    && includeTools
                );
            })
        )
    }
}