import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  isLoading:boolean = false
  constructor(
    private toastCtrl: ToastController,
    private loaderController: LoadingController,
  ) { }

  async successMessage(msg: string, duration?: number, isDark?: boolean) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration ? duration : 2000,
      animated: true,
      cssClass: 'text-center',
      color: isDark ? 'dark' : 'primary'
    });
    toast.present();
  }

  async errorMessage(msg: string, duration?:number) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration ? duration : 2000,
      animated: true,
      cssClass: 'text-center',
      color: 'danger'
    });
    toast.present();
  }

  async presentSpinner() {
    return new Promise((resolve, reject) => {
      if (!this.isLoading) {
        this.isLoading = true;
        this.loaderController.create({
          backdropDismiss: false,
          cssClass: 'commonLoader',
          mode: 'md'
        }).then((res) => {
          res.present();
          setTimeout(() => this.dismissSpinner(), 10000);
          resolve('')
        });
      }
    })
  }

  dismissSpinner() {
    if (this.isLoading) {
      this.loaderController.dismiss().then(res => this.isLoading = false)
      .catch((err) => console.log('Error occurred : ', err));
    }
  }
}
