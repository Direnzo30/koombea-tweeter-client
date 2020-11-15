import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private sessions: SessionsService) {
    this.signupForm = this.initializeForm()
  }

  ngOnInit(): void {
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  signup() {
    this.sessions.signUp(this.signupForm.value).subscribe(
      (response) => {

      },
      (error) => {
        
      }
    )
  }

}
