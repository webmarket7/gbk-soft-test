import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersMapComponent } from './users-map/users-map.component';
import { UsersNavbarComponent } from './users-navbar/users-navbar.component';
import { UsersComponent } from './users.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FullNameModule } from '../../shared/full-name/full-name.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxsModule } from '@ngxs/store';
import { UsersState } from './users/users.state';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersListComponent, UsersMapComponent, UsersNavbarComponent, UsersComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        NgxsModule.forFeature([UsersState]),
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        FullNameModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})
export class UsersModule { }
