import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private readonly path = 'user';

    constructor(private readonly apiService: ApiService) {
    }
}
