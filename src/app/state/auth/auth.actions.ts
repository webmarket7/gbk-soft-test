import { LoginPayload } from '../../auth/models/login.models';
import { RegisterPayload } from '../../auth/models/register.models';


export class Register {
    public static readonly type = '[Auth] Register';

    constructor(public payload: RegisterPayload) {
    }
}

export class Login {
    public static readonly type = '[Auth] Login';

    constructor(public payload: LoginPayload) {
    }
}

export class SilentLogin {
    public static readonly type = '[Auth] Silent Login';
}

export class Logout {
    public static readonly type = '[Auth] Logout';
}

export class ResetAuthState {
    public static readonly type = '[Auth] Reset Auth State';
}
