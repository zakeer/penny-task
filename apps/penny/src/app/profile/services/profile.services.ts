import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { APIClientService } from '../../shared/services/api-client.service';
import { AppState } from '../../store/state/app.state';
import { loadPublicProfilesSuccess, updateUserProfileSuccess } from '../profile.actions';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userEndpoint = '/users';

  constructor(private apiClient: APIClientService, private store: Store<AppState>) { }

  getPublicProfiles(): Observable<any> {
    return this.apiClient.get<any[]>(`${this.userEndpoint}`).pipe(
      tap(profiles => {
        this.store.dispatch(loadPublicProfilesSuccess({ profiles }));
      })
    );
  }

  getUserProfile(): Observable<any> {
    return this.apiClient.get(`${this.userEndpoint}`);
  }

  updateUserProfile(data: any): Observable<any> {
    return this.apiClient.put(`${this.userEndpoint}/profile`, data).pipe(
      tap(profile => {
        this.store.dispatch(updateUserProfileSuccess({ profile }));
      })
    );
  }
}
