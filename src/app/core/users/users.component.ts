import { Component, OnInit } from '@angular/core';
import { FetchUsers } from './users/users.actions';
import { Store } from '@ngxs/store';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    constructor(private readonly store: Store) {
    }

    ngOnInit(): void {
        this.store.dispatch(new FetchUsers());
    }

}
