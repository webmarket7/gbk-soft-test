export class FetchUsers {
    public static readonly type = '[Users] Fetch All Users';
}

export class SetSearchString {
    public static readonly type = '[Users] Set Search String For Users';

    constructor(public payload: { searchString: string }) {
    }
}

export class SearchUsers {
    public static readonly type = '[Users] Search Users';
}
