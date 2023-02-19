import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModal } from '../interface/loginModel';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  formSubmitted: boolean = false;
  passwordFormSubmitted: boolean = false;
  showPassword: boolean = false;
  forgotPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submitLoginForm(details: UserModal){
    this.formSubmitted = true;
    if(this.loginForm.valid){
      this.authservice.SignIn(details)
      this.formSubmitted = false;
    }
  }

  togglePassword(){
    this.showPassword = !this.showPassword
  }

  async submitForgotPassForm(value:any){
    this.passwordFormSubmitted = true;
    if(this.forgotPasswordForm.valid){
      await this.authservice.ForgotPassword(value.email)
      this.passwordFormSubmitted = false;
      this.redirectToLoginPage();
    }
  }

  redirectToLoginPage(){
    this.forgotPassword = false;
  }
  
  redirectToForgotPass(){
    this.forgotPassword = true;
  }
}
