import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProfileState } from '../state/profile.state';
import { Observable } from 'rxjs';
import { User } from '../../../common/models/user.models';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DeleteUserProfileImage, FetchCurrentUserProfile, SetUserProfileImage, UpdateUserProfile } from '../state/profile.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


@UntilDestroy()
@Component({
    selector: 'app-profile-editor',
    templateUrl: './profile-editor.component.html',
    styleUrls: ['./profile-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEditorComponent implements OnInit {


    @Select(ProfileState.userProfile)
    userProfile$: Observable<User>;

    form: FormGroup;

    get imageControl(): AbstractControl {
        return this.form.get('image');
    }

    get profileGroup(): FormGroup {
        return this.form.get('profile') as FormGroup;
    }

    get firstNameControl(): AbstractControl {
        return this.profileGroup.get('firstName');
    }

    get lastNameControl(): AbstractControl {
        return this.profileGroup.get('lastName');
    }

    get countryControl(): AbstractControl {
        return this.profileGroup.get('country');
    }

    get cityControl(): AbstractControl {
        return this.profileGroup.get('city');
    }

    constructor(private readonly store: Store,
                private readonly router: Router,
                private readonly route: ActivatedRoute,
                private readonly fb: FormBuilder,
                private readonly cdr: ChangeDetectorRef
    ) {
        this.form = this.fb.group({
            image: [''],
            profile: this.fb.group({
                firstName: ['', [Validators.maxLength(255)]],
                lastName: ['', [Validators.maxLength(255)]],
                gender: [null],
                country: ['', [Validators.maxLength(255)]],
                city: ['', [Validators.maxLength(255)]]
            })
        });
    }

    ngOnInit(): void {
        this.route.paramMap
            .subscribe((paramMap: ParamMap) => {
                const userId = paramMap.get('userId');

                this.store.dispatch(new FetchCurrentUserProfile());
            });

        this.userProfile$
            .pipe(untilDestroyed(this))
            .subscribe((userProfile: User) => {
                if (userProfile) {
                    this.imageControl.patchValue(userProfile.image);
                    this.profileGroup.patchValue(userProfile);
                }
            });
    }

    onSubmit(form: FormGroup): void {
        if (form.valid) {
            const formValue = form.value;

            if (formValue.image) {
                const formData = new FormData();

                formData.append('image', formValue.image);

                this.store.dispatch(new SetUserProfileImage({ image: formData }));
            }

            this.store.dispatch(new UpdateUserProfile({ updatePayload: formValue.profile }))
                .subscribe(() => {
                    this.form.markAsPristine();
                    this.cdr.markForCheck();
                });
        }
    }

    getTextFieldErrorMessage(control: AbstractControl): string {
        return control.hasError('maxlength')
               ? `This field can contain up to ${ control.getError('maxlength').requiredLength } symbols`
               : '';
    }

    onDeleteImage(event: MouseEvent): void {
        event.stopPropagation();
        this.store.dispatch(new DeleteUserProfileImage());
    }
}
