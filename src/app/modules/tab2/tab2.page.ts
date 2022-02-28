import { Component } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ModalWithNavigationPage } from 'src/app/components/modal-with-navigation/modal-with-navigation.component';
import { ModalContentPage } from 'src/app/pages/modal-content/modal-content.page';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  duration = 50;
  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
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
}
