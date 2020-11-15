import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionsService } from '../services/sessions.service';
import { StorageService } from '../services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.sass']
})
export class TweetComponent implements OnInit {

  public tweetForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private sessions: SessionsService,
    private storage: StorageService,
    private toaster: ToastrService) {

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
    this.sessions.signIn(this.tweetForm.value).subscribe(
      (response) => {
        this.toaster.success("Tweet Generated Successfully");
      },
      (error) => {
        this.toaster.error(error.error.error)
      }
    )
  }

}
