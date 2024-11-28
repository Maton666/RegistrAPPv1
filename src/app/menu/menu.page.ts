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
   //Almacena el texto del código escaneado
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
    // Crear el modal para iniciar el escaneo
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent, // Componente del modal
      cssClass:'barcode-scanning-modal',
      showBackdrop:false,
      componentProps: {
        formats: ['QR_CODE'], //
        lensFacing: LensFacing.Back, // Usa la cámara trasera
      },
    });

    
    await modal.present();

    // Recoge los datos del código escaneado al cerrar el modal
    const { data } = await modal.onWillDismiss();


    if (data){
      this.scanResult=data?.barcode?.displayValue;
    }
  }


}
