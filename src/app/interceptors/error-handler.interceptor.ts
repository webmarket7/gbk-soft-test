import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APIResponse } from '../common/models/api-response.models';
import { Store } from '@ngxs/store';
import { Logout, ResetAuthState } from '../state/auth/auth.actions';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    private static getResultFromResponse(response: APIResponse): unknown {
        return response?.result;
    }

    private static logError(errorMessage: string): void {
        console.error(errorMessage);
    }

    constructor(private readonly store: Store) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                map((event: HttpEvent<unknown>) => {
                    if (event instanceof HttpResponse) {
                        event = event.clone({ body: ErrorHandlerInterceptor.getResultFromResponse(event.body as APIResponse) });
                    }

                    return event;
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    console.log({errorResponse});
                    const clonedError = { ...errorResponse };
                    const status = clonedError.status;

                    if (status === 400) {
                        ErrorHandlerInterceptor.logError(errorResponse.error.message);
                    }

                    if (status === 401) {
                        this.store.dispatch(new ResetAuthState());
                    }

                    return throwError(errorResponse);
                })
            );
    }
}
