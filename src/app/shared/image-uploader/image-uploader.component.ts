import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    HostListener,
    Renderer2,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
    selector: 'app-image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageUploaderComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploaderComponent implements ControlValueAccessor {

    preview: string;
    propagateChange: (_: File) => {};
    propagateTouched: () => void;

    @HostListener('dragover', ['$event'])
    onDragOver(event): void {
        event.stopPropagation();
        event.preventDefault();
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave(event): void {
        event.stopPropagation();
        event.preventDefault();
    }

    @HostListener('drop', ['$event'])
    onDrop(event): void {
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        const file = files[0];

        this.readFile(file);
        this.propagateChange(file);
    }

    constructor(
        private readonly cdr: ChangeDetectorRef,
        private readonly renderer: Renderer2
    ) {
    }

    readFile(file: File): void {
        const fileReader = new FileReader();

        fromEvent(fileReader, 'load').pipe(take(1)).subscribe((event: ProgressEvent) => {
            this.preview = (event.target as FileReader).result as string;
            this.cdr.markForCheck();
        });

        fileReader.readAsDataURL(file);
    }

    registerOnChange(fn: (_: File) => {}): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.propagateTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(value: File | string): void {
        if (value instanceof File) {
            this.readFile(value);
        } else {
            this.preview = value;
            this.cdr.markForCheck();
        }
    }

    onChange(event: any): void {
        const files = event.target.files;
        const file = files[0];

        this.readFile(file);
        this.propagateChange(file);
    }

    getPreviewImageURL(previewURL: string): string {
        return previewURL ? `url(${ previewURL })` : undefined;
    }
}
