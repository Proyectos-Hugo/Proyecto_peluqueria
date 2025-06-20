import { Component } from '@angular/core';
import { EmpleadoService } from '../../../../service/empleado.service';
import { EmpleadoAltaDto } from '../../../../model/EmpeladoAltaDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styleUrls: ['./nuevo-empleado.component.css'],
  imports:[CommonModule, FormsModule],
})
export class NuevoEmpleadoComponent {
  dni: string = '';
  email: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';
  especialidad: string = '';
  telefono: string = '';

  mensaje: string = '';

  constructor(private empleadoService: EmpleadoService) {}

  altaEmpleado() {
    const nuevoEmpleado = new EmpleadoAltaDto(
      this.dni,
      this.email,
      this.password,
      this.nombre,
      this.apellido,
      this.especialidad,
      this.telefono
    );

    this.empleadoService.altaEmpleado(nuevoEmpleado).subscribe({
      next: (empleado) => {
        console.log('Empleado dado de alta:', empleado);
        this.mensaje = 'Empleado dado de alta correctamente.';
        // Opcional: limpiar campos
        this.dni = '';
        this.email = '';
        this.password = '';
        this.nombre = '';
        this.apellido = '';
        this.especialidad = '';
        this.telefono = '';
      },
      error: (error) => {
        this.mensaje = 'Error al dar de alta el empleado.';
        console.error(error);
      }
    });
  }
}
