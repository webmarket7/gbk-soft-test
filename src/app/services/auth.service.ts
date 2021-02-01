import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
    }

    checkIfLoggedIn(): Observable<boolean> {
        return of(true);
    }
}
