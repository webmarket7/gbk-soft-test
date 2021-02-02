import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../common/models/user.models';
import { UserProfileUpdatePayload } from '../core/profile/models/user-profile.models';


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

    updateUserProfile(updatePayload: UserProfileUpdatePayload): Observable<User> {
        return this.apiService.putRequest<Partial<User>>(`${ this.path }/profile`, updatePayload) as Observable<User>;
    }

    setUserProfileImage(image: FormData): Observable<User> {
        return this.apiService.postRequest<FormData>(`${ this.path }/profile/image`, image) as Observable<User>;
    }

    deleteUserProfileImage(): Observable<unknown> {
        return this.apiService.deleteRequest(`${ this.path }/profile/image`);
    }
}
