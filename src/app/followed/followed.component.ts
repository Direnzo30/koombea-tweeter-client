import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionsService } from '../services/sessions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrls: ['./followed.component.sass']
})
export class FollowedComponent implements OnInit {

  loading = true;
  followeds: any = [];
  userId: any;
  metadata: any;
  pageParams = {
    page: 1,
    perPage: 10,
    userId: null
  }
  username =  "";

  displayedColumns: string[] = ['full_name', 'username', 'followed'];

  constructor(private currentRoute: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService,
              private session: SessionsService) {

    this.userId = this.currentRoute.snapshot.paramMap.get('id');
    this.pageParams.userId = this.userId;
  }

  ngOnInit(): void {
    this.initFollowed();
  }

  initFollowed() {
    this.getFollowers();
  }

  getFollowers() {
    this.loading = true;
    this.session.getFollowedByUser(this.pageParams).subscribe(
      (response) => {
        this.followeds = response.result;
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

  paginate(event: any) {
    this.pageParams.page = event.pageIndex + 1;
    this.getFollowers()
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
