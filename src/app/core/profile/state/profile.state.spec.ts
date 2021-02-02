import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ProfileState } from './profile.state';


describe('Profile store', () => {
    let store: Store;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([ProfileState])]
        }).compileComponents();
        store = TestBed.get(Store);
    }));
});
