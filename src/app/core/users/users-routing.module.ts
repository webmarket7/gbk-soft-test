import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersMapComponent } from './users-map/users-map.component';
import { AuthGuard } from '../../guards/auth.guard';


const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'list',
                component: UsersListComponent
            },
            {
                path: 'map',
                component: UsersMapComponent
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
