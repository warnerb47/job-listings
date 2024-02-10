import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { JobState } from "./job.state";
import { InMemoryJobGateway } from "../../adapters/in-memory-job.gateway";
import { JobGateway } from "../../ports/job.gateway";
import { stubJobBuilder } from "../../models/builders/job.builder";
import { RetrieveJobs } from "./job.action";

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
        expect(store.snapshot().job).toEqual({
            jobs: []
        });
    });


    it('should retrieve jobs', () => {
        jobGateway.withJobs([new stubJobBuilder().build()])
        store.dispatch(new RetrieveJobs());
        expect(store.snapshot().job.jobs).toEqual([new stubJobBuilder().build()]);
    });
});