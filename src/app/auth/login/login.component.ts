import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Login } from '../../state/auth/auth.actions';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss', '../common/auth-common.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    get emailControl(): AbstractControl {
        return this.form.get('email');
    }

    get passwordControl(): AbstractControl {
        return this.form.get('password');
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
        });
    }

    ngOnInit(): void {
        this.title.setTitle('Login');
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

    onSubmit(form: FormGroup): void {
        if (form.valid) {
            const formValue = form.value;

            this.store.dispatch(new Login({
                email: formValue.email,
                password: formValue.password
            })).subscribe(() => {
                this.router.navigate(['/app']);
            });
        }
    }
}
