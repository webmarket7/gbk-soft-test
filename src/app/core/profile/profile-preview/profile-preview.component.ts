import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProfileState } from '../state/profile.state';
import { Observable } from 'rxjs';
import { User } from '../../../common/models/user.models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FetchUserProfile } from '../state/profile.actions';


@Component({
    selector: 'app-profile-preview',
    templateUrl: './profile-preview.component.html',
    styleUrls: ['./profile-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePreviewComponent implements OnInit {

    @Select(ProfileState.userProfile)
    userProfile$: Observable<User>;

    constructor(private readonly route: ActivatedRoute,
                private readonly store: Store) {
    }

    ngOnInit(): void {
        this.route.paramMap
            .subscribe((paramMap: ParamMap) => {
                const id = paramMap.get('userId');
                const userId = parseInt(id, 10);

                if (userId && typeof userId === 'number') {
                    this.store.dispatch(new FetchUserProfile({ userId }));
                }

            });
    }
}
