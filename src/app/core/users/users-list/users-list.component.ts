import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../common/models/user.models';
import { Select, Store } from '@ngxs/store';
import { UsersState } from '../users/users.state';


@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {

    @Select(UsersState.users)
    users$: Observable<User[]>;

    displayedColumns: string[] = ['email', 'name', 'gender', 'country', 'city'];

    constructor(private readonly store: Store) {
    }
}
