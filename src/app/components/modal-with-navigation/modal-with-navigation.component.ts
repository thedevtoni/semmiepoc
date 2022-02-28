import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-with-navigation',
  templateUrl: './modal-with-navigation.component.html',
})
export class ModalWithNavigationPage {
  rootPage: any;

  constructor(private modalController: ModalController) {}
}

import { NgModule } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [ModalWithNavigationPage],
  declarations: [ModalWithNavigationPage],
})
export class ModalWithNavigationModule {}
