import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { convertMilisecondsToDays } from '../common/helpers/time';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private readonly tokenName = 'token';

    constructor(private readonly cookieService: CookieService) {
    }

    persistToken(token: string, expiresIn: number): void {
        this.cookieService.set(
            this.tokenName,
            token,
            convertMilisecondsToDays(expiresIn),
            '/',
            environment.domain
        );
    }

    retrieveToken(): string {
        return this.cookieService.get(this.tokenName);
    }

    clearToken(): void {
        if (this.cookieService.check(this.tokenName)) {
            this.cookieService.delete(this.tokenName, '/', environment.domain);
        }
    }
}
