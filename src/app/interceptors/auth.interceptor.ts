import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/auth/auth.state';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private readonly store: Store) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let req = request;
        const token = this.store.selectSnapshot(AuthState.authToken);

        req = request.clone({
            headers: req.headers.append('Accept', 'application/json')
        });

        if (token) {
            req = request.clone({
                headers: req.headers.append('Authorization', `Bearer ${ token }`)
            });
        }

        return next.handle(req);
    }
}
