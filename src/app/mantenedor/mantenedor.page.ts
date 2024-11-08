import { Component, OnInit } from '@angular/core';
import { APIControllerService } from 'src/app/servicios/apicontroller.service';
import { StorageService } from '../servicios/storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mantenedor',
  templateUrl: './mantenedor.page.html',
  styleUrls: ['./mantenedor.page.scss'],
})
export class MantenedorPage implements OnInit {

  usuarios: any[] = [];

  constructor(
    private api: APIControllerService,
    private storageService: StorageService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.api.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        console.log(this.usuarios);
      },
      (error) => {
        console.error("Error al cargar los usuarios: " + error);
      }
    );
  }

  modificarUsuario(id: string) {
    this.navCtrl.navigateForward(`/moduser/${id}`);
  }

  async eliminarUsuario(id: string) {
    try {
      await this.api.deleteUsuarios(id).toPromise();
      console.log(`Usuario con ID: ${id} eliminado correctamente.`);
      await this.storageService.remove(id);
      console.log(`Usuario con ID: ${id} eliminado del almacenamiento local correctamente.`);
      this.cargarUsuarios(); // Recargar los usuarios después de eliminar
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }

  irARegistro() {
    this.navCtrl.navigateForward('/registro');
  }
}
