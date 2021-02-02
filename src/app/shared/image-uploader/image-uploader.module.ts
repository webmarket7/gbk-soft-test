import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './image-uploader.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [
        ImageUploaderComponent
    ],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [
        ImageUploaderComponent,
    ]
})
export class ImageUploaderModule {
}
