import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
    Route,
    UrlSegment,
    CanActivateChild, CanLoad
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../state/auth/auth.state';


@Injectable({
    providedIn: 'root'
})
export class NonAuthGuard implements CanActivate, CanActivateChild, CanLoad {

    @Select(AuthState.isAuthenticated)
    isAuthenticated$: Observable<boolean>;

    constructor(
        private readonly store: Store,
        private readonly router: Router
    ) {
    }

    private _checkIfLoggedIn(): Observable<boolean | UrlTree> {
        return this.isAuthenticated$.pipe(
            map((isAuthenticated: boolean) => !isAuthenticated || this.router.createUrlTree(['/app'])),
            take(1)
        );
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean | UrlTree> {
        return this._checkIfLoggedIn();
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
        return this._checkIfLoggedIn();
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
        return this._checkIfLoggedIn();
    }
}
