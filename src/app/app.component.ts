import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { CommonService } from './shared/services/common.service';
import { StatusBar } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { NotificationService } from './shared/services/notification.service';

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
    private platform: Platform,
    private notificationService: NotificationService

  ) {
    this.watchNetworkConnection();
    SplashScreen.show({showDuration: 2000, autoHide: true}).then(() => {
      this.initialliseApp();
    })
  }

  private initialliseApp() {
    this.platform.ready().then(() => {
      StatusBar.setBackgroundColor({color: '#00a5a3'});
      this.checkIsTokenExpired();
      if (!this.platform.is("desktop")) {
        this.notificationService.initPushNotification();
      }
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
  watchNetworkConnection(){
    let hideFirstTime = 0;
    this.commonService.connectionChanged.subscribe(status => {
      hideFirstTime ++;
      if(!status){
        StatusBar.setBackgroundColor({color: '#00a5a3'});
        this.commonService.errorMessage('Internet Connection Disconnected');
      }
      if(status && hideFirstTime > 1){
        StatusBar.setBackgroundColor({color: '#ff0000'});
        this.commonService.successMessage('Internet Connection Connected', 2000, true);
      }
    })
  }
}
