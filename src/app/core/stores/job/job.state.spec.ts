import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { JobState, JobStateModelDefaults } from "./job.state";
import { InMemoryJobGateway } from "../../adapters/in-memory-job.gateway";
import { JobGateway } from "../../ports/job.gateway";
import { StubJobBuilder } from "../../models/builders/job.builder";
import { FetchJobs, FilterJobs } from "./job.action";
import { AddQuery, ClearQuery, RemoveQuery } from "./query.action";

describe('JobState', () => {
    let store: Store
    let jobGateway: InMemoryJobGateway;

    beforeEach(() => {
        jobGateway = new InMemoryJobGateway();
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([JobState])],
            providers: [
                { provide: JobGateway, useValue: jobGateway }
            ],
        });
        store = TestBed.inject(Store);
    });

    it('should have default values', () => {
        expect(store.snapshot().job).toEqual(JobStateModelDefaults);
    });


    it('should fetch jobs', () => {
        jobGateway.withJobs([new StubJobBuilder().build()])
        store.dispatch(new FetchJobs());
        expect(store.snapshot().job.jobs).toEqual([new StubJobBuilder().build()]);
    });

    it('should filter jobs', () => {
        jobGateway.withJobs([
            new StubJobBuilder().withlevel('Senior').build(),
            new StubJobBuilder().withlevel('Junior').build(),
        ]);
        store.dispatch(new FilterJobs({level: 'Senior', languages: [], role: '', tools: []}));
        expect(store.snapshot().job.jobs).toEqual([new StubJobBuilder().withlevel('Senior').build()]);
    });

    it('should add query', () => {
        store.dispatch(new AddQuery({level: 'Senior', languages: ['HTML']}));
        expect(store.snapshot().job.query).toEqual({level: 'Senior', languages: ['HTML'], role: '', tools: []});
    });

    it('should remove query', () => {
        store.dispatch(new AddQuery({level: 'Senior', languages: ['HTML']}));
        store.dispatch(new RemoveQuery({languages: ['HTML']}));
        expect(store.snapshot().job.query).toEqual({level: 'Senior', languages: [], role: '', tools: []});
    });
    it('should clear query', () => {
        store.dispatch(new ClearQuery());
        expect(store.snapshot().job.query).toEqual(JobStateModelDefaults.query);
    });
});