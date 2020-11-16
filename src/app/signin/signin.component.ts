import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionsService } from '../services/sessions.service';
import { StorageService } from '../services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup;
  public loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private sessions: SessionsService,
              private storage: StorageService,
              private toaster: ToastrService,
              private router: Router) {
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
    this.loading = true;
    this.sessions.signIn(this.signinForm.value).subscribe(
      (response) => {
        this.storage.storeUser(response.result);
        this.toaster.success("Welcome");
        this.loading = false;
        this.router.navigate(['dashboard'])

      },
      (error) => {
        this.loading = false;
        this.toaster.error("Invalid Credentials")
      }
    )
  }

}
