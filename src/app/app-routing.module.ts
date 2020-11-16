import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TweetComponent } from './tweet/tweet.component';
import { FollowedComponent } from './followed/followed.component';
import { FollowersComponent } from './followers/followers.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: ':id/followed', component: FollowedComponent },
  { path: ':id/followers', component: FollowersComponent },
  { path: ':id/profile', component: ProfileComponent},
  { path: 'tweet', component: TweetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
