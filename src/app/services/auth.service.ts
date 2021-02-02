import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RegisterPayload, RegisterResponse } from '../auth/models/register.models';
import { LoginPayload, LoginResponse } from '../auth/models/login.models';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly path = 'user';

    constructor(private readonly apiService: ApiService) {
    }

    register(payload: RegisterPayload): Observable<RegisterResponse> {
        return this.apiService.postRequest<RegisterPayload>(`${this.path}/register`, payload) as Observable<RegisterResponse>;
    }

    login(payload: LoginPayload): Observable<LoginResponse> {
        return this.apiService.postRequest<LoginPayload>(`${this.path}/login`, payload) as Observable<LoginResponse>;
    }

    logout(): Observable<unknown> {
        return this.apiService.postRequest(`${this.path}/logout`);
    }
}
