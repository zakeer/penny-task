import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  error: string | null;
}

export const initialState: AuthState = {
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signupSuccess, (state, { token }) => ({ ...state, token, error: null })),
  on(AuthActions.signupFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.signinSuccess, (state, { token }) => ({ ...state, token, error: null })),
  on(AuthActions.signinFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.logout, state => ({ ...state, token: null, error: null })),
);
