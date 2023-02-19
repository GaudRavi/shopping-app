import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

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
  SignIn(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.router.navigate(['/dashboard']);
    })
    .catch(error => this.commonService.errorMessage(error.message));
  }

  // Sign up with email/password
    SignUp(email: string, password: string) {
      return this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['/login']);
      })
      .catch(error => this.commonService.errorMessage(error.message));
    }
}
