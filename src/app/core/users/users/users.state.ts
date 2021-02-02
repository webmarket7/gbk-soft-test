import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { User } from '../../../common/models/user.models';
import { UsersService } from '../../../services/users.service';
import { FetchUsers, SearchUsers, SetSearchString } from './users.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


export interface UsersStateModel {
    users: User[];
    perPage: number;
    page: number;
    filterParams: { searchString: string };
}

@State<UsersStateModel>({
    name: 'users',
    defaults: {
        users: [],
        perPage: 10,
        page: 0,
        filterParams: { searchString: '' }
    }
})
@Injectable()
export class UsersState {

    @Selector()
    static users(state: UsersStateModel): User[] {
        return state.users;
    }

    constructor(private readonly usersService: UsersService) {
    }

    @Action(FetchUsers)
    fetchUsers({ patchState, getState }: StateContext<UsersStateModel>): Observable<User[]> {
        const { perPage, page } = getState();

        return this.usersService.fetchUsers({ perPage, page })
            .pipe(tap((users: User[]) => {
                patchState({ users });
            }));
    }

    @Action(SetSearchString)
    setSearchString({ patchState, getState }: StateContext<UsersStateModel>,
                    { payload: { searchString } }: SetSearchString
    ): void {
        const { filterParams } = getState();

        patchState({
            filterParams: { ...filterParams, searchString }
        });
    }

    @Action(SearchUsers)
    searchUsers({ patchState, getState }: StateContext<UsersStateModel>): Observable<User[]> {
        const { perPage, page, filterParams } = getState();

        return this.usersService.searchUsers({...filterParams, perPage, page})
            .pipe(tap((users: User[]) => {
                patchState({ users });
            }));
    }

}
