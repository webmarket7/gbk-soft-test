export class Login {
    public static readonly type = '[Auth] Login';

    constructor(public payload: {
        email: string,
        password: string
    }) {
    }
}
