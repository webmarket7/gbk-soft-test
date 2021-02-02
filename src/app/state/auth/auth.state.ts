import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Login, Logout, Register, ResetAuthState, SilentLogin } from './auth.actions';
import { AuthService } from '../../services/auth.service';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { EMPTY, Observable, throwError } from 'rxjs';
import { LoginResponse } from '../../auth/models/login.models';
import { RegisterResponse } from '../../auth/models/register.models';
import { TokenService } from '../../services/token.service';


const DEFAULT_STATE = {
    isAuthenticated: false,
    token: null,
    expiredAt: 0
};

export interface AuthStateModel {
    isAuthenticated: boolean;
    token: string | null;
    expiredAt: number;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: DEFAULT_STATE
})
@Injectable()
export class AuthState {

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return state.isAuthenticated;
    }

    @Selector()
    static authToken(state: AuthStateModel): string {
        return state.token;
    }

    constructor(private readonly authService: AuthService,
                private readonly tokenService: TokenService) {
    }

    @Action(Register)
    register({ patchState }: StateContext<AuthStateModel>, { payload }: Register): Observable<RegisterResponse> {
        return this.authService.register(payload).pipe(
            tap(({ token, expiredAt }: RegisterResponse) => {
                patchState({
                    isAuthenticated: true,
                    token,
                    expiredAt
                });
                this.tokenService.persistToken(token, expiredAt);
            }),
            catchError((error) => {
                patchState(DEFAULT_STATE);
                return throwError(error);
            })
        );
    }

    @Action(Login)
    login({ patchState }: StateContext<AuthStateModel>, { payload }: Login): Observable<LoginResponse> {
        return this.authService.login(payload).pipe(
            tap(({ token, expiredAt }: LoginResponse) => {
                patchState({
                    isAuthenticated: true,
                    token,
                    expiredAt
                });
                this.tokenService.persistToken(token, expiredAt);
            }),
            catchError((error) => {
                patchState(DEFAULT_STATE);
                return throwError(error);
            })
        );
    }

    @Action(SilentLogin)
    silentLogin({ patchState }: StateContext<AuthStateModel>): void {
        const token = this.tokenService.retrieveToken();

        if (token) {
            patchState({
                isAuthenticated: true,
                token
            });
        }
    }

    @Action(Logout)
    logout({ getState, patchState, dispatch }: StateContext<AuthStateModel>): Observable<unknown> {
        const { isAuthenticated, token } = getState();

        return isAuthenticated && token
               ? this.authService.logout().pipe(mergeMap(() => dispatch(new ResetAuthState())))
               : EMPTY;
    }

    @Action(ResetAuthState)
    resetAuthState({ patchState }: StateContext<AuthStateModel>): void {
        patchState(DEFAULT_STATE);
        this.tokenService.clearToken();
    }
}
