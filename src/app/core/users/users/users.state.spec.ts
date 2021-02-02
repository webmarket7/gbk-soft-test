import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { UsersState } from './users.state';


describe('Users store', () => {
    let store: Store;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([UsersState])]
        }).compileComponents();
        store = TestBed.get(Store);
    }));
});
