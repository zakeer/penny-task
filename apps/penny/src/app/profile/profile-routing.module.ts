import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicProfilesComponent } from './components/public-profiles/public-profiles.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: PublicProfilesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
