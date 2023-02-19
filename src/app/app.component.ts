import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { CommonService } from './shared/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authservice: AuthService,
    public router: Router,
    private commonService: CommonService
  ) {
    this.commonService.presentSpinner().then(() => {
      this.initialliseApp();
    })
  }

  private initialliseApp() {
    this.checkIsTokenExpired();
  }

  async checkIsTokenExpired(){
    const idToken = await localStorage.getItem('idToken');
    if (idToken) 
    this.authservice.initAutoLogin();
    else{
      this.commonService.dismissSpinner();
      this.router.navigate(['/login'])
    }
  }
}
