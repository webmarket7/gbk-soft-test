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
}
