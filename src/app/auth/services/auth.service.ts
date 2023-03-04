import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserModal } from '../interface/loginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private commonService: CommonService
  ) { }

  // Sign in with email/password
  SignIn(details: UserModal) {
    return this.fireauth.signInWithEmailAndPassword(details.email, details.password)
    .then((result) => {
      result.user?.getIdTokenResult().then(res =>  localStorage.setItem('idToken',res.token))
      localStorage.setItem('creds', JSON.stringify(details));
      this.commonService.dismissSpinner();
      this.router.navigate(['/dashboard']);
    })
    .catch(error => {
      this.LogOut();
      this.commonService.errorMessage(error.message)
    });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.fireauth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.router.navigate(['/login']);
    })
    .catch(error => this.commonService.errorMessage(error.message));
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.fireauth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      this.commonService.successMessage('Password reset email sent, check your inbox.')
    })
    .catch(error => this.commonService.errorMessage(error.message));
  }

  LogOut() {
    return this.fireauth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  //Auto login
  public initAutoLogin() {
    const details: UserModal = JSON.parse(localStorage.getItem('creds')!);
    if (details) this.SignIn(details);
    else this.router.navigate(['/login']);
  }
}
