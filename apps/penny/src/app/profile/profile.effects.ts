import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as UserActions from './profile.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfileService } from './services/profile.services';

@Injectable()
export class UserEffects {
  loadPublicProfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadPublicProfiles),
      mergeMap(() =>
        this.userService.getPublicProfiles().pipe(
          map(profiles => UserActions.loadPublicProfilesSuccess({ profiles })),
          catchError(error => of(UserActions.loadPublicProfilesFailure({ error })))
        )
      )
    )
  );

  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserProfile),
      mergeMap(action =>
        this.userService.updateUserProfile(action.payload).pipe(
          map(profile => UserActions.updateUserProfileSuccess({ profile })),
          catchError(error => of(UserActions.updateUserProfileFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: ProfileService) { }
}
