import { Component, OnInit } from '@angular/core';
import { ModalController, IonNav, Platform } from '@ionic/angular';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.page.html',
  styleUrls: ['./modal-content.page.scss'],
})
export class ModalContentPage implements OnInit {
  level = 0;
  nextPage = ModalContentPage;

  constructor(private modalController: ModalController, private nav: IonNav) {}

  ngOnInit() {}

  goForward() {
    this.nav.push(this.nextPage, { level: this.level + 1 });
  }

  goRoot() {
    this.nav.popToRoot();
  }

  close() {
    this.modalController.dismiss();
  }
}
