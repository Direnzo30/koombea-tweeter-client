import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { SessionsService } from '../services/sessions.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  user: User | null;
  followedCount = 0;
  followingCount = 0;
  
  constructor(private router: Router,
              private session: SessionsService,
              private storage: StorageService) {
    
    this.user = this.initUser();
  }

  ngOnInit(): void {
    this.getCounters();
  }

  initUser() {
    return this.storage.getUser();
  }

  getCounters() {
    if (!this.user) {
      return
    }
    this.session.getUserStats(this.user.id).subscribe(
      (response) => {
        this.followedCount = response.result.followed;
        this.followingCount = response.result.followers;
      },
      (error) => {

      }
    )
  }

  generateTweet() {
    this.router.navigate(['/tweet'])
  }

}
