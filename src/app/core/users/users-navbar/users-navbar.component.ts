import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { SearchUsers, SetSearchString } from '../users/users.actions';


@UntilDestroy()
@Component({
    selector: 'app-users-navbar',
    templateUrl: './users-navbar.component.html',
    styleUrls: ['./users-navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersNavbarComponent implements OnInit {

    tabs = [
        {
            path: ['list'],
            label: 'List'
        },
        {
            path: ['map'],
            label: 'Map'
        },
    ];

    searchControl: FormControl;

    constructor(private readonly fb: FormBuilder,
                private readonly store: Store) {
        this.searchControl = this.fb.control('');
    }

    ngOnInit(): void {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(300),
                untilDestroyed(this)
            ).subscribe((value: string) => {
            this.store.dispatch(
                [
                    new SetSearchString({ searchString: value }),
                    new SearchUsers()
                ]);
        });
    }
}
