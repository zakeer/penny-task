import { createSelector } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { UserState } from './profile.reducer';

export const selectUserState = (state: AppState) => {
  console.log(":: state.user ::", state);
  return state.user
};

export const selectPublicProfiles = createSelector(
  selectUserState,
  (state: UserState) => state.profiles
);
