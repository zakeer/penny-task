import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PublicProfilesComponent } from './components/public-profiles/public-profiles.component';
import { AuthService } from '../auth/services/auth.service';


@NgModule({
  declarations: [
    PublicProfilesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
  ],
  providers: [AuthService]
})
export class ProfileModule { }
