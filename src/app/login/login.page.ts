import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    
    const isValid = true; 
    if (isValid) {
      this.router.navigate(['/home']); 
    } else {
      alert('Credenciales inválidas'); 
    }
  }

  goToHome() {
    this.router.navigate(['/home']); 
  }

  goToRecover() {
    this.router.navigate(['/recover']); 
  }
}

