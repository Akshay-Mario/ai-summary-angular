import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginModel } from '../shared/models/login.model';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: LoginService, private router: Router) {

    this.loginForm = this.fb.group({
      'username': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  action: 'login' | 'register' = 'login'; // default action

  public onSubmit(action: string): void {

    if (this.loginForm.valid) {
      const values: LoginModel = this.loginForm.value;
      values.password = btoa(values.password)
      if (action === "register")
        this.authService.registerService(values).subscribe(result => {
          console.log(result)
        })
      else {
        this.authService.loginService(values).subscribe({
          next: (res) => {
            this.authService.storeAccessToken(res.accessToken);
            this.router.navigate(['/home']);
          },
          error: () => {
            alert('login failed');
          }
        })
      }
      this.loginForm.reset();
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

}
