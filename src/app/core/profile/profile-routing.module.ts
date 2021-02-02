import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';


const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'me',
                component: ProfileEditorComponent,
            },
            {
                path: ':userId',
                component: ProfilePreviewComponent,
            },
            {
                path: '',
                redirectTo: 'me',
                pathMatch: 'full'
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {
}
