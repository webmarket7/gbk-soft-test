import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Login } from './auth.actions';


export interface AuthStateModel {
    isAuthenticated: boolean;
    token: string | null;
    expiredAt: number;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        isAuthenticated: false,
        token: null,
        expiredAt: 0
    }
})
export class AuthState {

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return state.isAuthenticated;
    }

    @Action(Login)
    login({ patchState }: StateContext<AuthStateModel>, { payload }: Login): void {
        patchState({
            isAuthenticated: true
        });
    }
}
