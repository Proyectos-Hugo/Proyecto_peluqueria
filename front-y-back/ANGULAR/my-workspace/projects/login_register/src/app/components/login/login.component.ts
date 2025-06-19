import { UserService } from './../../service/user.service';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:string;
  password:string;

  constructor(private log :LoginService, private userService: UserService, private router: Router){}

  login(){
    this.userService.findUser(this.email,this.password).subscribe({
      next: (usuario) => {
        if (usuario) {
          console.log('Usuario encontrado:', usuario);

          localStorage.setItem('cliente', JSON.stringify(usuario));
          this.userService.setUser(usuario);
          this.router.navigate(['/home']);
        }
        else{
          console.error('Usuario no encontrado');
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    })

  }
  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

}
