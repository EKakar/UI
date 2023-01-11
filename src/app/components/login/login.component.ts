import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          sessionStorage.setItem('mail', this.loginForm.value.mail);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);

          this.auth.storeRefreshToken(res.refreshToken);

          let tokenPayload = this.auth.decodeToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.toast.success({
            detail: 'Login Succes',
            summary: res.message,
            duration: 5000,
          });
          this.router.navigate(['note']);
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Something went wrong!',
            duration: 5000,
          });
          console.log(err);
        },
      });
    } else {
      //throw error
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('Your form is invalid');
    }
  }
}
