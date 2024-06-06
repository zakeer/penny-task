import { createAction, props } from '@ngrx/store';

export const signup = createAction('[Auth] Signup', props<{ payload: any }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ token: string }>());
export const signupFailure = createAction('[Auth] Signup Failure', props<{ error: any }>());

export const signin = createAction('[Auth] Signin', props<{ payload: any }>());
export const signinSuccess = createAction('[Auth] Signin Success', props<{ token: string }>());
export const signinFailure = createAction('[Auth] Signin Failure', props<{ error: any }>());



export const forgotPassword = createAction('[Auth] Forgot Password', props<{ payload: any }>());
export const forgotPasswordSuccess = createAction('[Auth] Forgot Password Success');
export const forgotPasswordFailure = createAction('[Auth] Forgot Password Failure', props<{ error: any }>());

export const resetPassword = createAction('[Auth] Reset Password', props<{ token: string, newPassword: string }>());
export const resetPasswordSuccess = createAction('[Auth] Reset Password Success');
export const resetPasswordFailure = createAction('[Auth] Reset Password Failure', props<{ error: any }>());

export const logout = createAction('[Auth] Logout');
