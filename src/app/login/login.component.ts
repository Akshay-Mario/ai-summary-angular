import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginModel } from '../shared/models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    loginForm: FormGroup;

    constructor(private fb: FormBuilder) {

      this.loginForm = this.fb.group({
        'email': ['',[Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(6)]]
      })
    }

    public onSubmit(): void {
      if(this.loginForm.valid) {
        const values: LoginModel = this.loginForm.value;
        console.log("values :", values);
        this.loginForm.reset();
      }
      else {
        this.loginForm.markAllAsTouched();
      }
    }

}
