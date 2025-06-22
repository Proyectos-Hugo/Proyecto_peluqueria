
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../service/cliente.service';
import { RouterModule, Router } from '@angular/router';
import { UserDatosDto } from '../../model/UserDatosDto';
import { EmpleadoService } from '../../service/empleado.service';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:string;
  password:string;

  constructor(private clienteService :ClienteService, private empleadoService: EmpleadoService, private userService: UserService, private router: Router){}

  login(){
    this.userService.findUser(this.email,this.password).subscribe({
      next: (usuario: UserDatosDto) => {
        if (usuario) {
          console.log(usuario.role)
          console.log('Usuario encontrado:', usuario);
          if(usuario.role === 'empleado'){
            this.empleadoService.getEmpleadoPorDni(usuario.email).subscribe({
              next: (empleado) => {
                console.log('Empleado encontrado:', empleado);
                this.empleadoService.setEmpleado(empleado);
                localStorage.setItem('empleado', JSON.stringify(empleado));
                this.router.navigate(['/home']);
              }

            });
          }
          else if(usuario.role === 'cliente'){

            this.clienteService.findUsu(usuario.email).subscribe({
              next: (cliente) => {
                localStorage.setItem('cliente', JSON.stringify(cliente));
                console.log('Cliente encontrado:', cliente);
                this.clienteService.setCliente(cliente);
                localStorage.setItem('cliente', JSON.stringify(cliente));
                this.router.navigate(['/home']);
              }
            });
          }
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
