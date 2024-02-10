import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { JobState } from "./job.state";

describe('JobState', () => {
    let store: Store

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([JobState])]
        });
        store = TestBed.inject(Store);
    });

    it('should have default values', () => {
        expect(store.snapshot().job).toEqual({
            jobs: []
        });
    });
});