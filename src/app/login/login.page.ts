import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIControllerService } from '../servicios/apicontroller.service'; 
import { AuthenticatorService } from '../servicios/authenticator.service'; 

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
    private authenticatorService: AuthenticatorService
  ) {}

  async iniciarSesion() {
    try {

      const usuarios = await this.apiService.getUsuarios().toPromise();


      const usuarioEncontrado = usuarios.find(
        (usuario: any) => usuario.email === this.email && usuario.password === this.password
      );

      if (usuarioEncontrado) {
        console.log('Usuario encontrado:', usuarioEncontrado);


        const loginExitoso = await this.authenticatorService.loginBDD(this.email, this.password);

        if (loginExitoso) {
          console.log('Login correcto, redirigiendo a la vista principal');
          this.router.navigate(['/menu']);
        } else {
          this.errorMessage = 'Correo o contraseña incorrectos';
          console.log('Login fallido, redirigiendo al login.');
        }
      } else {

        this.errorMessage = 'Correo o contraseña incorrectos';
        console.log('Usuario no encontrado en la base de datos');
      }
    } catch (error) {
      // Manejar errores en caso de que falle la solicitud a la API
      this.errorMessage = 'Error al iniciar sesión. Intente de nuevo.';
      console.error('Error al obtener usuarios: ', error);
    }
  }
  goToHome() {
    this.router.navigate(['/home']);
  }

}
