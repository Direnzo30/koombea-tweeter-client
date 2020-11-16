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
    perPage: 10
  }

  displayedColumns: string[] = ['full_name', 'username', 'followed'];

  constructor(private currentRoute: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService,
              private session: SessionsService) {

    this.userId = this.currentRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.initFollowed();
  }

  initFollowed() {
    this.loading = true;
    this.session.getFollowedByUser(this.userId).subscribe(
      (response) => {
        this.followeds = response.result;
        this.metadata = response.metadata;
        this.loading = false;
      },
      (error) => {}
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
