import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { APIControllerService } from './apicontroller.service'; 

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  connectionStatus: boolean;

  constructor(private storage: StorageService, private apiService: APIControllerService) { 
    this.connectionStatus = false;
  }

  async loginBDD(email: string, password: string): Promise<boolean> {
    try {
      // Llamamos a la API para obtener todos los usuarios
      const usuarios = await this.apiService.getUsuarios().toPromise();

      // Buscamos el usuario que coincida con el correo y la contraseña
      const usuarioEncontrado = usuarios.find(
        (usuario: any) => usuario.email === email && usuario.password === password
      );

      if (usuarioEncontrado) {
        // Si el usuario se encuentra, actualizamos el estado de conexión y guardamos en el almacenamiento local
        this.connectionStatus = true;
        await this.storage.set('currentUser', usuarioEncontrado);  // Guardamos el usuario actual en el almacenamiento
        console.log('Login exitoso:', usuarioEncontrado);
        return true;
      } else {
        // Si el usuario no se encuentra, establecemos el estado de conexión como falso
        this.connectionStatus = false;
        return false;
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      this.connectionStatus = false;
      return false;
    }
  }

  async isConectedAsync(): Promise<boolean> {
    console.log('isConectedAsync - Estado de conexión:', this.connectionStatus);
    return this.connectionStatus;
  }

  logout() {
    this.connectionStatus = false;
    this.storage.remove('currentUser'); // Eliminamos el usuario actual del almacenamiento al cerrar sesión
  }

  async registrar(usuario: any): Promise<boolean> {
    try {
      // Intentamos registrar el usuario en la base de datos a través del APIControllerService
      const res = await this.apiService.postUsuarios(usuario).toPromise();
      if (res) {
        console.log('Usuario registrado en la base de datos:', usuario);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }
}
