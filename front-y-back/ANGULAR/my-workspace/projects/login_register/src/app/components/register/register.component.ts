import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../service/register.service';
import { ClienteDatosDto } from '../../model/ClienteDatosDto';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email: string = '';
  nombre: string = '';
  apellido: string = '';
  password: string = '';
  telefono: string = '';

  constructor(private registerService:RegisterService,  private router: Router){}

  registrarCliente() {
    this.registerService.registerCliente(
      this.email,
      this.nombre,
      this.apellido,
      this.password,
      this.telefono
    ).subscribe({
      next: (response: ClienteDatosDto) => {
        // Maneja el éxito (puedes mostrar un mensaje o redirigir)
        console.log('Cliente registrado:', response);
      },
      error: (error) => {
        // Maneja el error
        console.error('Error al registrar cliente:', error);
      }
    });
  }
    goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
