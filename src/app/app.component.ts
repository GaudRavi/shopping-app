import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { CommonService } from './shared/services/common.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

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
    this.commonService.presentSpinner().then(() => {
      this.initialliseApp();
    })
  }

  private initialliseApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('android')){
        StatusBar.setOverlaysWebView({ overlay: true });
        StatusBar.setStyle({style: Style.Dark})
        const style = document.documentElement.style;
        style.setProperty('--ion-safe-area-top', 20 + 'px');
      }
      this.checkIsTokenExpired();
    })
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
