import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIControllerService } from '../servicios/apicontroller.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmarPassword: string = '';
  errorMessage: string = '';

  constructor(private apiService: APIControllerService, private router: Router) {}

  async registrarse() {
    // Validar que las contraseñas coinciden
    if (this.password !== this.confirmarPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    // Crear un objeto para el nuevo usuario
    const nuevoUsuario = {
      email: this.email,
      password: this.password
    };

    try {
      // Llamar al método de la API para agregar el nuevo usuario
      await this.apiService.postUsuarios(nuevoUsuario).toPromise();

      // Redirigir a la página de login después de registrar
      this.router.navigate(['/login']);
      console.log("Usuario agregado a la base de datos");
    } catch (error) {
      // Manejar errores
      this.errorMessage = 'Error al registrar el usuario. Intenta nuevamente.';
      console.error('Error al registrar usuario: ', error);
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
