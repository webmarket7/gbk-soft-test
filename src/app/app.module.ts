import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { environment } from '../environments/environment';

import { AuthState } from './state/auth/auth.state';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NgxsModule.forRoot([AuthState], {
            developmentMode: !environment.production
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
