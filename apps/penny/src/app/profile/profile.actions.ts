import { createAction, props } from '@ngrx/store';
import { User } from '../shared/models/user.model';

export const loadPublicProfiles = createAction('[User] Load Public Profiles');
export const loadPublicProfilesSuccess = createAction('[User] Load Public Profiles Success', props<{ profiles: User[] }>());
export const loadPublicProfilesFailure = createAction('[User] Load Public Profiles Failure', props<{ error: any }>());

export const updateUserProfile = createAction('[User] Update Profile', props<{ payload: User }>());
export const updateUserProfileSuccess = createAction('[User] Update Profile Success', props<{ profile: User }>());
export const updateUserProfileFailure = createAction('[User] Update Profile Failure', props<{ error: any }>());

