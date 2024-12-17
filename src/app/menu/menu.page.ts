import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router
  ) {}

  async openScanner(): Promise<void> {
    const hasPermission = await this.requestCameraPermission();
    if (!hasPermission) {
      this.showPermissionAlert();
      return;
    }

    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      componentProps: {
        formats: ['QR_CODE'], 
        lensFacing: 'back',
      },
      cssClass: 'barcode-scanning-modal',
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.barcode) {
        const scannedText = result.data.barcode.rawValue;
        console.log('Código escaneado:', scannedText);
        await this.showScannedCodeAlert(scannedText);
      }
    });

    await modal.present();
  }

 
  private async requestCameraPermission(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  
  private async showPermissionAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Activa los permisos de la camara para scannear',
      buttons: ['OK'],
    });
    await alert.present();
  }

 
  private async showScannedCodeAlert(scannedText: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Escaneo Completo',
      message: scannedText || 'El codigo no es legible',
      buttons: ['OK'],
    });
    await alert.present();
  }

  navigateToQrPage() {
    this.router.navigate(['/qrpage']);
  }

}