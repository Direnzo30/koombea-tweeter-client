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
  userId: any;
  metadata: any;
  pageParams = {
    page: 1,
    perPage: 10,
    userId: null
  }
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
  }

  getUserProfile() {
    this.session.getUserProfile(this.pageParams.userId).subscribe(
      (response) => {
        this.userProfile = response.result;
      },
      (error) => {

      }
    )
  }

  gotToFollowers() {

  }

  gotToFollowed() {
    
  }

}
