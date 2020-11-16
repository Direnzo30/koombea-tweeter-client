import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionsService } from '../services/sessions.service';
import { StorageService } from '../services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.sass']
})
export class TweetComponent implements OnInit {

  public tweetForm: FormGroup;
  public loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private sessions: SessionsService,
    private storage: StorageService,
    private toaster: ToastrService,
    private router: Router) {

  this.tweetForm = this.initializeForm()
  }

  ngOnInit(): void {

  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(280)]],
    })
  }

  createTweet() {
    this.loading = true;
    this.sessions.createTweet(this.tweetForm.value).subscribe(
      (response) => {
        this.loading = false;
        this.toaster.success("Tweet Generated Successfully");
        this.router.navigate(['/dashboard'])
      },
      (error) => {
        this.loading = false;
        this.toaster.error(error.error.error)
      }
    )
  }

}
