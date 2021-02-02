import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../common/models/user.models';


@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private readonly path = 'user';

    constructor(private readonly apiService: ApiService) {
    }

    fetchUsers(queryParams: { perPage: number, page: number }): Observable<User[]> {
        const params = ApiService.prepareParams<{ perPage: number, page: number }>(queryParams);

        return this.apiService.getRequest(this.path, params) as Observable<User[]>;
    }

    searchUsers(queryParams: { searchString: string, perPage: number, page: number }): Observable<User[]> {
        const params = ApiService.prepareParams<{ searchString: string }>(queryParams);

        return this.apiService.getRequest(`${ this.path }/search`, params) as Observable<User[]>;
    }
}
