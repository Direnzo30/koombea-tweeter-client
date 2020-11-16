import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionsService } from '../services/sessions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.sass']
})
export class FollowersComponent implements OnInit {

  loading = true;
  followers: any = [];
  userId: any;
  metadata: any;
  pageParams = {
    page: 1,
    perPage: 10
  }
  username = "";

  displayedColumns: string[] = ['full_name', 'username', 'followed'];

  constructor(private currentRoute: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService,
              private session: SessionsService) {

    this.userId = this.currentRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.initFollowers();
  }

  initFollowers() {
    this.loading = true;
    this.session.getFollowingUser(this.userId).subscribe(
      (response) => {
        this.followers = response.result;
        this.metadata = response.metadata;
        this.username = response.metadata.username;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.toaster.error("User not found")
      }
    )
  }

  followUser(user: any) {
    user.loading = true;
    this.session.followUser(user.id).subscribe(
      (response) => {
        user.followed = true;
        user.loading = false;
        this.toaster.success("User followed successfully");
      },
      (error) => {
        user.loading = false;
        this.toaster.error("Unable to generate follow");
      }
    )
  }

}
