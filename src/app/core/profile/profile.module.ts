import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MatButtonModule
    ]
})
export class ProfileModule { }
