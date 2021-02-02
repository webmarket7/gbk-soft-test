import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CustomValidators } from '../../common/validators/custom-validators';
import { Register } from '../../state/auth/auth.actions';
import { Title } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';


@UntilDestroy()
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss', '../common/auth-common.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

    form: FormGroup;

    get emailControl(): AbstractControl {
        return this.form.get('email');
    }

    get passwordControl(): AbstractControl {
        return this.form.get('password');
    }

    get confirmPasswordControl(): AbstractControl {
        return this.form.get('confirmPassword');
    }

    constructor(
        private readonly title: Title,
        private readonly fb: FormBuilder,
        private readonly store: Store,
        private readonly router: Router
    ) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
            confirmPassword: ['', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(255),
                CustomValidators.compareWith('password')
            ]],
        });
        this.passwordControl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.confirmPasswordControl.updateValueAndValidity();
            });
    }

    ngOnInit(): void {
        this.title.setTitle('Register');
    }

    getEmailErrorMessage(): string {
        return this.emailControl.hasError('required')
               ? 'You must enter a value'
               : this.passwordControl.hasError('maxlength')
                 ? `Email can contain up to ${ this.passwordControl.getError('maxlength').requiredLength } symbols`
                 : this.emailControl.hasError('email')
                   ? 'Not a valid email'
                   : '';
    }

    getPasswordErrorMessage(): string {
        return this.passwordControl.hasError('required')
               ? 'You must enter a value'
               : this.passwordControl.hasError('minlength')
                 ? `Password must contain ${ this.passwordControl.getError('minlength').requiredLength } symbols or more`
                 : this.passwordControl.hasError('maxlength')
                   ? `Password can contain up to ${ this.passwordControl.getError('maxlength').requiredLength } symbols`
                   : '';
    }

    getConfirmPasswordErrorMessage(): string {
        return this.confirmPasswordControl.hasError('required')
               ? 'You must enter a value'
               : this.confirmPasswordControl.hasError('mismatch')
                 ? 'Passwords do not match'
                 : '';
    }

    onSubmit(form: FormGroup): void {
        if (form.valid) {
            const formValue = form.value;

            this.store.dispatch(new Register({
                email: formValue.email,
                password: formValue.password
            })).subscribe(() => {
                this.router.navigate(['/app/profile']);
            });
        }
    }
}
