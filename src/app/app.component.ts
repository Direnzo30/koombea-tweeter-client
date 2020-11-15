import { Component, OnDestroy } from '@angular/core';
import { StorageService } from './services/storage.service';
import { SessionsService } from './services/sessions.service';
import { User } from './models/user';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy {
  title = 'Base';
  currentUser : User | null = null;
  promise : Subscription;

  constructor(public storage: StorageService,
              public session: SessionsService,
              public toaster: ToastrService,
              public router: Router) {

    this.promise = this.storage.getBehavUser().subscribe((user) => {
      this.currentUser = user;
    })
  }

  signOut() {
    this.session.signOut().subscribe(
      (response) => {
        this.toaster.success("Session terminated succesfully");
        this.storage.deleteUser();
        this.router.navigate(['/signin'])
      },
      (error) => {
        this.toaster.error("Problems with session");
        this.storage.deleteUser();
        this.router.navigate(['/signin'])
      }
    )
  }

  backHome() {
    this.router.navigate(['/dashboard'])
  }

  ngOnDestroy() {
    this.promise.unsubscribe();
  }
}
