import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(action =>
        this.authService.signup(action.payload).pipe(
          map(response => AuthActions.signupSuccess({ token: response.access_token })),
          catchError(error => of(AuthActions.signupFailure({ error })))
        )
      )
    )
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signin),
      mergeMap(action =>
        this.authService.signin(action.payload).pipe(
          map(response => AuthActions.signinSuccess({ token: response.access_token })),
          catchError(error => of(AuthActions.signinFailure({ error: error.error || error })))
        )
      )
    )
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      mergeMap(action =>
        this.authService.forgotPassword(action.payload).pipe(
          map(() => AuthActions.forgotPasswordSuccess()),
          catchError(error => of(AuthActions.forgotPasswordFailure({ error })))
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      mergeMap(action =>
        this.authService.resetPassword(action.token, action.newPassword).pipe(
          map(() => AuthActions.resetPasswordSuccess()),
          catchError(error => of(AuthActions.resetPasswordFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.actions$.pipe(
      ofType(AuthActions.forgotPasswordSuccess),
      map(() => {
        this.snackBar.open('Please Check your email', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/auth/signin']);
      })
    ).subscribe();

    this.actions$.pipe(
      ofType(AuthActions.resetPasswordSuccess),
      map(() => {
        this.snackBar.open('Password reset successfully', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/auth/signin']);
      })
    ).subscribe();

    this.actions$.pipe(
      ofType(AuthActions.signinSuccess),
      map(() => {
        this.snackBar.open('Login successfully', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/profile']);
      })
    ).subscribe();

    this.actions$.pipe(
      ofType(AuthActions.signupSuccess),
      map(() => {
        this.snackBar.open('Signup success', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/auth/signin']);
      })
    ).subscribe();
  }
}
