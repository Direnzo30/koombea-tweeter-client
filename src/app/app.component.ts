import { Component, OnDestroy } from '@angular/core';
import { StorageService } from './services/storage.service';
import { User } from './models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy {
  title = 'Base';
  currentUser : User | null = null;
  promise : Subscription;

  constructor(public storage: StorageService) {
    this.promise = this.storage.getBehavUser().subscribe((user) => {
      this.currentUser = user;
    })
  }

  ngOnDestroy() {
    this.promise.unsubscribe();
  }
}
