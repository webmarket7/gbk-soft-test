import { UserProfileUpdatePayload } from '../models/user-profile.models';


export class FetchCurrentUserProfile {
    public static readonly type = '[Profile] Fetch Current User Profile';
}

export class FetchUserProfile {
    public static readonly type = '[Profile] Fetch User Profile';

    constructor(public payload: { userId: number }) {
    }
}

export class UpdateUserProfile {
    public static readonly type = '[Profile] Update User Profile';

    constructor(public payload: { updatePayload: UserProfileUpdatePayload }) {
    }
}

export class SetUserProfileImage {
    public static readonly type = '[Profile] Set User Profile Image';

    constructor(public payload: { image: FormData }) {
    }
}

export class DeleteUserProfileImage {
    public static readonly type = '[Profile] Delete User Profile Image';
}
