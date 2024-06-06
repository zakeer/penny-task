import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/state/app.state';
import { loadPublicProfiles } from '../../profile.actions';
import { selectPublicProfiles } from '../../profile.selectors';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-public-profiles',
  templateUrl: './public-profiles.component.html',
  styleUrls: ['./public-profiles.component.css'],
})
export class PublicProfilesComponent implements OnInit {
  publicProfiles$: Observable<any[]>;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
  ) {
    this.publicProfiles$ = this.store.pipe(select(selectPublicProfiles));
  }

  ngOnInit() {
    this.store.dispatch(loadPublicProfiles());
  }

  logout() {
    this.authService.logout();
  }
}
