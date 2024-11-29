import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, LoadingController } from '@ionic/angular';
import { LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component'; // Componente del modal
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  qrText = '';

  scanResult= '';
   constructor(
    private modalController: ModalController,
    private platform: Platform,
  ) {}

  ngOnInit(): void {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners()
    }
  }

  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent, 
      cssClass:'barcode-scanning-modal',
      showBackdrop:false,
      componentProps: {
        formats: ['QR_CODE'], 
        lensFacing: LensFacing.Back, // Usa la cámara trasera
      },
    });

    
    await modal.present();

    
    const { data } = await modal.onWillDismiss();


    if (data){
      this.scanResult=data?.barcode?.displayValue;
    }
  }


}
