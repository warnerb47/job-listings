import { StubJobBuilder } from "../../models/builders/job.builder";
import { JobQuery } from "../../models/query.model";
import { JobSelectors } from "./job.selector";

describe('Job Selectors', () => {
    it('should filter jobs', () => {
        const jobs = [
            new StubJobBuilder()
            .withlanguages(['HTML', 'CSS', 'JavaScript'])
            .withtools(['Angular'])
            .withrole('Frontend')
            .withlevel('Senior')
            .build(),

            new StubJobBuilder()
            .withlanguages(['JavaScript', 'NodeJs'])
            .withtools(['Nestjs'])
            .withrole('Backend')
            .withlevel('Senior')
            .build(),

            new StubJobBuilder()
            .withlanguages(['Python'])
            .withtools(['Django'])
            .withrole('Backend')
            .withlevel('Junior')
            .build(),
        ];


        let query: JobQuery = { level: 'Senior', role: 'Frontend', languages: [], tools: [] };
        expect(JobSelectors.filter()(jobs, query)).toEqual([
            new StubJobBuilder()
            .withlanguages(['HTML', 'CSS', 'JavaScript'])
            .withtools(['Angular'])
            .withrole('Frontend')
            .withlevel('Senior')
            .build(),
        ]);

        query = { languages: ['JavaScript'], level: '', role: '', tools: [] };
        expect(JobSelectors.filter()(jobs, query)).toEqual([
            new StubJobBuilder()
            .withlanguages(['HTML', 'CSS', 'JavaScript'])
            .withtools(['Angular'])
            .withrole('Frontend')
            .withlevel('Senior')
            .build(),

            new StubJobBuilder()
            .withlanguages(['JavaScript', 'NodeJs'])
            .withtools(['Nestjs'])
            .withrole('Backend')
            .withlevel('Senior')
            .build()
        ]);

        query = { languages: [], level: 'Senior', role: 'Backend', tools: ['Django'] };
        expect(JobSelectors.filter()(jobs, query)).toEqual([])
    });
});
