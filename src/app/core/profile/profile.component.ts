import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../../state/auth/auth.actions';
import { Router } from '@angular/router';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    constructor(private readonly store: Store,
                private readonly router: Router) {
    }

    ngOnInit(): void {
    }

    logout(): void {
        this.store.dispatch(new Logout())
            .subscribe((state) => {
                if (!state.auth.isAuthenticated) {
                    this.router.navigate(['/auth', 'login']);
                }
            });
    }
}
