import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIControllerService } from '../servicios/apicontroller.service'; 
import { AuthenticatorService } from '../servicios/authenticator.service'; 
import { ModalController } from '@ionic/angular';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private apiService: APIControllerService,
    private router: Router,
    private authenticatorService: AuthenticatorService,
    private modalController: ModalController
  ) {}

  async iniciarSesion() {
    try {
      const usuarios = await this.apiService.getUsuarios().toPromise();
      const usuarioEncontrado = usuarios.find(
        (usuario: any) => usuario.email === this.email && usuario.password === this.password
      );

      if (usuarioEncontrado) {
        const loginExitoso = await this.authenticatorService.loginBDD(this.email, this.password);
        if (loginExitoso) {
          this.router.navigate(['/menu']);
        } else {
          this.mostrarModalError('Contraseña incorrecta. Intente de nuevo.');
        }
      } else {
        this.mostrarModalError('Correo o contraseña incorrectos.');
      }
    } catch (error) {
      this.mostrarModalError('Error al iniciar sesión. Intente de nuevo.');
      console.error('Error al obtener usuarios: ', error);
    }
  }

  async mostrarModalError(mensaje: string) {
    const modal = await this.modalController.create({
      component: ErrorModalComponent,
      componentProps: { mensaje },
      backdropDismiss: false,
    });
    await modal.present();
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}