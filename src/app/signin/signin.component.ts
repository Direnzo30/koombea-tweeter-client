import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private sessions: SessionsService) {
    this.signinForm = this.initializeForm()
  }

  ngOnInit(): void {
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  signin() {
    this.sessions.signIn(this.signinForm.value).subscribe(
      (response) => {

      },
      (error) => {

      }
    )
  }

}
