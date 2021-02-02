import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatButtonModule } from '@angular/material/button';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from './state/profile.state';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ImageUploaderModule } from '../../shared/image-uploader/image-uploader.module';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';


@NgModule({
  declarations: [ProfileComponent, ProfileEditorComponent, ProfilePreviewComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProfileRoutingModule,
        MatButtonModule,
        NgxsModule.forFeature([ProfileState]),
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        ImageUploaderModule
    ]
})
export class ProfileModule { }
