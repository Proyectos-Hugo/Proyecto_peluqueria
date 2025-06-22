import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';
import { EmpleadoService } from './service/empleado.service';
import { ClienteService } from './service/cliente.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule, MatMenuModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router, private clienteService: ClienteService, private empleadoService: EmpleadoService, private userService: UserService){}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('cliente');
  }
  logout(): void {
    localStorage.removeItem('cliente');
    localStorage.removeItem('empleado');
    this.clienteService.removeCliente();
    this.router.navigate(['/home']);
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
  isAdmin(): boolean {
    return this.userService.obtenerRole() == 'empleado';
  }

  //LOGIN Y REGISTRO
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
  //MASCOTAS
  goToMisMascotas() {
    this.router.navigate(['/mis-mascotas']);
  }
  goToNuevaMascota() {
    this.router.navigate(['/nueva-mascota']);
  }
  goToMascotas(){
    this.router.navigate(['/gestion-mascotas']);
  }


  //EMPLEADOS
  goToMisEmpleados(){
    this.router.navigate(['/mis-empleados']);
  }
  goToNuevoEmplado(){
    this.router.navigate(['/nuevo-empleado']);
  }



  //CITAS

  goToMisCitas(){
    this.router.navigate(['/mis-citas']);
  }
  goToGestionCitas(){
    this.router.navigate(['/gestion-citas']);
  }
  goToNuevaCitaEmpleado(){
    this.router.navigate(['/nueva-cita-empleado']);
  }
  goToNuevaCitaCliente(){
    this.router.navigate(['/nueva-cita-cliente']);
  }


  //PRODUCTOS
  goToProductos(){
    this.router.navigate(['/productos']);
  }

}
