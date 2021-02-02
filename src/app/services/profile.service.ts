import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../common/models/user.models';


@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private readonly path = 'user';

    constructor(private readonly apiService: ApiService) {
    }

    fetchCurrentUser(): Observable<User> {
        return this.apiService.getRequest(`${ this.path }/current`, null) as Observable<User>;
    }

    fetchUserById(id: number): Observable<User> {
        return this.apiService.getRequest(`${ this.path }/${ id }`, null) as Observable<User>;
    }
}
