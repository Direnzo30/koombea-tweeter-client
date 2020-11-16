import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { SessionsService } from '../services/sessions.service';
import { StorageService } from '../services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  user: User | null;
  profile: any;
  loading = true;
  loadingTweets = true;
  metadata: any = {
    totalRecords: 0
  };
  pageParams = {
    page: 1,
    perPage: 10,
    userId: null
  }
  tweets: any = [];
  
  constructor(private router: Router,
              private toaster: ToastrService,
              private session: SessionsService,
              private storage: StorageService) {
    
    this.user = this.initUser();
  }

  ngOnInit(): void {
    this.initProfile();
    this.getFeed();
  }

  initUser() {
    return this.storage.getUser();
  }

  initProfile() {
    if (!this.user) {
      return
    }
    this.session.getUserProfile(this.user.id).subscribe(
      (response) => {
        this.profile = response.result;
      },
      (error) => {
        this.toaster.error("Unable to get user profile")
      }
    )
  }

  goToFollowers() {
    this.router.navigate([`${this.profile.id}/followers`])
  }

  goToFollowed() {
    this.router.navigate([`${this.profile.id}/followed`])
  }

  generateTweet() {
    this.router.navigate(['/tweet'])
  }

  getFeed() {
    this.loadingTweets = true;
    this.session.getAllFeed(this.pageParams).subscribe(
      (response) => {
        this.tweets = response.result;
        this.metadata = response.metadata;
        this.loadingTweets = false;
      },
      (error) => {
        this.loadingTweets = false;
        this.toaster.error("Unable to load the feed")
      }
    )
  }

  paginate(event: any) {
    this.pageParams.page = event.pageIndex + 1;
    this.getFeed();
  }

}
