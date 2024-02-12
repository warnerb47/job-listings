import { JobQuery } from "../../models/query.model";

export class AddQuery {
    static readonly type = "[Query Page] update query";
    constructor(public partQuery: Partial<JobQuery>) {}
}

export class RemoveQuery {
    static readonly type = "[Query Page] remove query";
    constructor(public partQuery: Partial<JobQuery>) {}
}

export class ClearQuery {
    static readonly type = "[Query Page] clear query";
}
