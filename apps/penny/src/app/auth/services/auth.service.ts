import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { APIClientService } from '../../shared/services/api-client.service';
import { AppState } from '../../store/state/app.state';
import { logout, signinSuccess, signupSuccess } from '../auth.actions';
import { loadPublicProfilesSuccess } from '../../profile/profile.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authEndpoint = '/auth';

  constructor(
    private apiClient: APIClientService,
    private store: Store<AppState>,
    private router: Router
  ) {

  }

  signup(data: any): Observable<any> {
    return this.apiClient.post<{ access_token: string }>(`${this.authEndpoint}/register`, data).pipe(
      tap(response => {
        this.store.dispatch(signupSuccess({ token: response.access_token }));
      })
    );
  }


  signin(data: any): Observable<any> {
    return this.apiClient.post<{ accessToken: string }>(`${this.authEndpoint}/login`, data).pipe(
      tap(response => {
        localStorage.setItem('token', response.accessToken);
        this.store.dispatch(signinSuccess({ token: response.accessToken }));
      })
    );
  }

  forgotPassword(data: any): Observable<any> {
    return this.apiClient.post(`${this.authEndpoint}/forgot-password`, data);
  }

  resetPassword(resetToken : string, newPassword: string): Observable<any> {
    return this.apiClient.post(`${this.authEndpoint}/reset-password`, { resetToken , newPassword });
  }

  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(logout());
    this.store.dispatch(loadPublicProfilesSuccess({ profiles: [] }));
    this.router.navigate(['/auth/signin']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
