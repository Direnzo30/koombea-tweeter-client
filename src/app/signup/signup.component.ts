import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionsService } from '../services/sessions.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  public loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private sessions: SessionsService,
              private toaster: ToastrService,
              private router: Router) {
    this.signupForm = this.initializeForm()
  }

  ngOnInit(): void {
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  signup() {
    this.loading = true;
    this.sessions.signUp(this.signupForm.value).subscribe(
      (response) => {
        this.toaster.success("User Registered");
        this.loading = false;
        this.router.navigate(['/signin'])
      },
      (error) => {
        this.loading = false;
        this.toaster.error(error.error.error)
      }
    )
  }

}
