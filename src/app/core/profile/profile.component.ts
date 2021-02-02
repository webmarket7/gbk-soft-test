import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Logout } from '../../state/auth/auth.actions';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

    constructor(private readonly store: Store,
                private readonly router: Router) {
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
