import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { User } from '../shared/models/user.model';

export interface UserState {
  profiles: User[];
  profile: User | null;
  error: string | null;
}

export const initialState: UserState = {
  profiles: [],
  profile: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(ProfileActions.loadPublicProfilesSuccess, (state, { profiles }) => ({ ...state, profiles, error: null })),
  on(ProfileActions.loadPublicProfilesFailure, (state, { error }) => ({ ...state, error })),
  on(ProfileActions.updateUserProfileSuccess, (state, { profile }) => ({ ...state, profile, error: null })),
  on(ProfileActions.updateUserProfileFailure, (state, { error }) => ({ ...state, error })),
);
