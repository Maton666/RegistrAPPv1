import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';         
  email: string = '';         
  password: string = '';      
  confirmPassword: string = ''; 

  constructor(private navCtrl: NavController) {}

  register() {
    
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    
    console.log('Registro:', this.name, this.email, this.password);

    
    this.navCtrl.navigateRoot('/login');
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
