import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersMapComponent } from './users-map/users-map.component';
import { UsersNavbarComponent } from './users-navbar/users-navbar.component';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [UsersListComponent, UsersMapComponent, UsersNavbarComponent, UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
