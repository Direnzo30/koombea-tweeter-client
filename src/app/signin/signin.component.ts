import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.signinForm = this.initializeForm()
  }

  ngOnInit(): void {
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  signin() {
    
  }

}
