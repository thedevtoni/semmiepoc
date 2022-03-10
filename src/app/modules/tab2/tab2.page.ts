import { Component } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ModalWithNavigationPage } from 'src/app/components/modal-with-navigation/modal-with-navigation.component';
import { ModalContentPage } from 'src/app/pages/modal-content/modal-content.page';
import { Haptics } from '@capacitor/haptics';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  duration = 50;
  constructor(
    private modalController: ModalController,
    public faio: FingerprintAIO
  ) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalWithNavigationPage,
      componentProps: {
        rootPage: ModalContentPage,
      },
    });
    await modal.present();
  }

  vibrate() {
    Haptics.vibrate({ duration: this.duration });
  }

  vibrateHard() {
    Haptics.vibrate({ duration: 1000 });
  }

  check() {
    console.log('check');
    this.faio
      .isAvailable()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  show() {
    console.log('show');
    this.faio
      .show({
        disableBackup: true, // Only for Android(optional)
        fallbackButtonTitle: 'Use Pin', // Only for iOS
        cancelButtonTitle: 'Cancel', // Only for iOS
        title: 'FaceId Test',
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
