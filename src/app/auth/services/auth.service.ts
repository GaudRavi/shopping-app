import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserModal } from '../interface/loginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLogedIn = new BehaviorSubject(false);

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private commonService: CommonService
  ) { }

  // Sign in with email/password
  SignIn(details: UserModal) {
    return new Promise((resolve, reject) => {
      this.fireauth.signInWithEmailAndPassword(details.email, details.password)
      .then(result => {
        this.isUserLogedIn.next(true);
        resolve(true);
        result.user?.getIdTokenResult().then(res =>  localStorage.setItem('idToken',res.token));
        localStorage.setItem('creds', JSON.stringify(details));
        this.commonService.dismissSpinner();
        this.router.navigate(['/dashboard']);
      }, (error) => {
        reject(error);
        this.LogOut();
        this.commonService.errorMessage(error.message);
      })
    });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.commonService.successMessage('Account created please login');
        resolve(true);
        this.router.navigate(['/login']);
      }, (error) => {
        reject(error);
        this.commonService.errorMessage(error.message);
      });
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return new Promise((resolve, reject) => {
      this.fireauth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        resolve(true);
        this.commonService.successMessage('Password reset email sent, check your inbox.')
      }, (error) => {
        reject(error);
        this.commonService.errorMessage(error.message);
      })
    })
  }

  LogOut() {
    return this.fireauth.signOut().then(() => {
      this.isUserLogedIn.next(false);
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  //Auto login
  public initAutoLogin() {
    const details: UserModal = JSON.parse(localStorage.getItem('creds')!);
    if (details && this.commonService.isOnline) this.SignIn(details);
    else if (details && !this.commonService.isOnline) this.router.navigate(['/dashboard']);
    else this.router.navigate(['/login']);
  }
}
