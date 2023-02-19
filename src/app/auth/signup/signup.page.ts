import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserModal } from '../interface/loginModel';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm!: FormGroup;
  formSubmitted: boolean = false;
  showPassword: boolean = false;
  showConfPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submitSignupForm(cred: UserModal){
    this.formSubmitted = true;
    if(cred.confirmPassword && cred.confirmPassword !== cred.password){
      this.commonService.errorMessage('Password must be same !');
    }
    if(this.signupForm.valid && cred.password === cred.confirmPassword){
      this.authservice.SignUp(cred.email, cred.password);
      this.formSubmitted = false;
    }
  }

  togglePassword(feild: string){
    if(feild === 'password')
    this.showPassword = !this.showPassword;
    if(feild === 'confirmPassword')
    this.showConfPassword = !this.showConfPassword;
  }

}
