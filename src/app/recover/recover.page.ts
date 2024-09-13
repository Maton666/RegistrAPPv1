import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: 'recover.page.html',
  styleUrls: ['recover.page.scss'],
})
export class RecoverPage {
  email: string = '';

  constructor(private router: Router) {}

  recoverPassword() {
    
    if (this.email) {
      alert('Se ha enviado un enlace de recuperación a tu correo electrónico.');
      this.router.navigate(['/login']);
    } else {
      alert('Por favor, ingresa un correo electrónico válido.');
    }
  }

  goToHome() {
    this.router.navigate(['/home']); 
  }

  goToLogin() {
    this.router.navigate(['/login']); 
  }
}