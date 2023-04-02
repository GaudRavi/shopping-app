import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { FirestorDBService } from 'src/app/shared/services/firestore-db.service';
import { UserModal } from '../interface/loginModel';
import { DashboardSales } from '../../application/dashboard/models/DashboardSales';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLogedIn = new BehaviorSubject(false);

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private commonService: CommonService,
    private firebaseDB: FirestorDBService
  ) { }

  // Sign in with email/password
  SignIn(details: UserModal, isAutoLogin = true) {
    return new Promise((resolve, reject) => {
      this.fireauth.signInWithEmailAndPassword(details.email, details.password)
      .then(async (result) => {
        this.isUserLogedIn.next(true);
        resolve(true);
        await result.user?.getIdTokenResult().then(res =>  {
          let userInfo = {
            displayName: result.user?.displayName,
            email: result.user?.email,
            idToken: res.token,
            uid: result.user?.uid
          }
          localStorage.setItem('user',JSON.stringify(userInfo));
          localStorage.setItem('idToken',res.token);
        });
        localStorage.setItem('creds', JSON.stringify(details));
        // this.commonService.dismissSpinner();
        if(!isAutoLogin)
        this.router.navigate(['/dashboard'], { replaceUrl: true });
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
      .then(async (result: any) => {
        if(result.additionalUserInfo.isNewUser){
          let dashSales: DashboardSales = {
            id: result.user?.uid,
            totalSales: 0,
            salesCount: 0,
            lastCycleSales: 0,
            lastCycleSalesCount: 0,
            lastCycleProfit: 0,
            profit: 0,
            salesTarget: 0,
            expenses: 0,
            lastCycleExpenses: 0
          }
          await this.firebaseDB.create(dashSales, result.user?.uid)
        }
        this.commonService.successMessage('Account created please login');
        resolve(true);
        this.router.navigate(['/login'], { replaceUrl: true });
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
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }

  //Auto login
  public initAutoLogin() {
    const details: UserModal = JSON.parse(localStorage.getItem('creds')!);
    if (details && this.commonService.isOnline) this.SignIn(details);
    else if (details && !this.commonService.isOnline)
    this.router.navigate(['/dashboard'], { replaceUrl: true });
    else this.router.navigate(['/login'], { replaceUrl: true });
  }
}
