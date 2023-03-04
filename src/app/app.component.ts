import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { CommonService } from './shared/services/common.service';
import { StatusBar } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authservice: AuthService,
    public router: Router,
    private commonService: CommonService,
    private platform: Platform

  ) {
    SplashScreen.show({showDuration: 2000, autoHide: true}).then(() => {
      this.initialliseApp();
    })
  }

  private initialliseApp() {
    this.platform.ready().then(() => {
      StatusBar.setBackgroundColor({color: '#00a5a3'});
      this.checkIsTokenExpired();
    })
  }

  async checkIsTokenExpired(){
    const idToken = await localStorage.getItem('idToken');
    if (idToken){
      await this.authservice.initAutoLogin();
      SplashScreen.hide()
    }
    else{
      this.commonService.dismissSpinner();
      this.router.navigate(['/login'])
    }
  }
}
