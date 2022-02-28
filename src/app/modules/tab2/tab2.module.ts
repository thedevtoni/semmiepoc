import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalWithNavigationModule } from 'src/app/components/modal-with-navigation/modal-with-navigation.component';
import { ModalContentPageModule } from 'src/app/pages/modal-content/modal-content.module';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { Tab2Page } from './tab2.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    ModalWithNavigationModule,
    ModalContentPageModule
  ],
  declarations: [Tab2Page],
})
export class Tab2PageModule {}
