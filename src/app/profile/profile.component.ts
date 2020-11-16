import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionsService } from '../services/sessions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  loading = true;
  loadingTweets = true;
  userId: any;
  metadata: any = {
    totalRecords: 0
  };
  pageParams = {
    page: 1,
    perPage: 10,
    userId: null
  }
  tweets: any = [];
  userProfile: any;

  displayedColumns: string[] = ['full_name', 'username', 'followed'];

  constructor(private currentRoute: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService,
              private session: SessionsService) {

    this.userId = this.currentRoute.snapshot.paramMap.get('id');
    this.pageParams.userId = this.userId;
  }

  ngOnInit(): void {
    this.getUserProfile()
    this.getTweetsByUser();
  }

  getUserProfile() {
    this.loading = true;
    this.session.getUserProfile(this.pageParams.userId).subscribe(
      (response) => {
        this.userProfile = response.result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.toaster.error('Unable to retrieve profile');
      }
    )
  }

  getTweetsByUser() {
    this.loadingTweets = true;
    this.session.getTweetsByUser(this.pageParams).subscribe(
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
    this.getTweetsByUser();
  }

  followUser(user: any) {
    user.loading = true;
    this.session.followUser(user.id).subscribe(
      (response) => {
        user.followed = true;
        user.loading = false;
        this.toaster.success(`You are now following @${user.username}`);
      },
      (error) => {
        user.loading = false;
        this.toaster.error("Unable to generate follow");
      }
    )
  }

  goToFollowers() {
    this.router.navigate([`${this.userProfile.id}/followers`])
  }

  goToFollowed() {
    this.router.navigate([`${this.userProfile.id}/followed`])
  }

}
