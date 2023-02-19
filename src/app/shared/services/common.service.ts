import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastCtrl: ToastController) { }

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
}
