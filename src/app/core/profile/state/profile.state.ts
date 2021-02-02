import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../../../common/models/user.models';
import { ProfileService } from '../../../services/profile.service';
import {
    DeleteUserProfileImage,
    FetchCurrentUserProfile,
    FetchUserProfile,
    SetUserProfileImage,
    UpdateUserProfile
} from './profile.actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


export interface ProfileStateModel {
    userProfile: User;
}

@State<ProfileStateModel>({
    name: 'profile',
    defaults: {
        userProfile: null
    }
})
@Injectable()
export class ProfileState {

    @Selector()
    static userProfile(state: ProfileStateModel): User {
        return state.userProfile;
    }


    constructor(private readonly profileService: ProfileService) {
    }

    @Action(FetchCurrentUserProfile)
    fetchCurrentUserProfile({ patchState }: StateContext<ProfileStateModel>): Observable<User> {
        return this.profileService.fetchCurrentUser().pipe(
            tap((userProfile: User) => {
                patchState({
                    userProfile
                });
            })
        );
    }

    @Action(FetchUserProfile)
    fetchUserProfile({ patchState }: StateContext<ProfileStateModel>,
                     { payload: { userId } }: FetchUserProfile
    ): Observable<User> {
        return this.profileService.fetchUserById(userId).pipe(
            tap((userProfile: User) => {
                patchState({
                    userProfile
                });
            })
        );
    }

    @Action(UpdateUserProfile)
    updateUserProfile({ patchState, getState }: StateContext<ProfileStateModel>,
                      { payload: { updatePayload } }: UpdateUserProfile
    ): Observable<User> {
        const { userProfile } = getState();

        return this.profileService.updateUserProfile(updatePayload).pipe(
            tap((updatedUserProfile: User) => {
                patchState({
                    userProfile: {...userProfile, ...updatedUserProfile}
                });
            })
        );
    }

    @Action(SetUserProfileImage)
    setUserProfileImage({ patchState, getState }: StateContext<ProfileStateModel>,
                        { payload: { image } }: SetUserProfileImage): Observable<User> {
        const { userProfile } = getState();

        return this.profileService.setUserProfileImage(image).pipe(
            tap((updatedUserProfile: User) => {
                patchState({
                    userProfile: {...userProfile, ...updatedUserProfile}
                });
            })
        );
    }

    @Action(DeleteUserProfileImage)
    deleteUserProfileImage({ getState, patchState }: StateContext<ProfileStateModel>): Observable<unknown> {
        const { userProfile } = getState();

        return this.profileService.deleteUserProfileImage().pipe(tap(() => {
            patchState({
                userProfile: { ...userProfile, image: '' }
            });
        }));
    }
}
