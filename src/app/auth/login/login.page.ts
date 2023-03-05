import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserModal } from '../interface/loginModel';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  formSubmitted: boolean = false;
  isLoginStart: boolean = false;
  passwordFormSubmitted: boolean = false;
  showPassword: boolean = false;
  forgotPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    public router: Router,
    private commonService: CommonService
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

  async submitLoginForm(details: UserModal){
    this.formSubmitted = true;
    if(this.loginForm.valid){
      this.isLoginStart = true;
      await this.authservice.SignIn(details).then(res => {
        if(res){
          this.isLoginStart = false;
          this.loginForm.reset();
          this.formSubmitted = false;
        }
      }, (error) => {
        this.isLoginStart = false;
      })
    }
  }

  togglePassword(){
    this.showPassword = !this.showPassword
  }

  async submitForgotPassForm(value:any){
    this.passwordFormSubmitted = true;
    if(this.forgotPasswordForm.valid){
      this.isLoginStart = true;
      this.loginForm.reset();
      await this.authservice.ForgotPassword(value.email)
      .then(() => this.isLoginStart = false, () => this.isLoginStart = false)
      this.passwordFormSubmitted = false;
      this.redirectToLoginPage();
    }
  }

  redirectToLoginPage(){
    this.forgotPasswordForm.reset();
    this.forgotPassword = false;
  }
  
  redirectToForgotPass(){
    this.loginForm.reset();
    this.forgotPassword = true;
  }

  ngOnDestroy(){
    this.loginForm.reset();
    this.forgotPasswordForm.reset();
  }
}
