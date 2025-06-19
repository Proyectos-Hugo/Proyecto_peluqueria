import { Component } from '@angular/core';
import { EmpleadoService } from '../../../../service/empleado.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoDatosDto } from '../../../../model/EmpleadoDatosDto';

@Component({
  selector: 'app-mis-empleados',
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-empleados.component.html',
  styleUrl: './mis-empleados.component.css'
})
export class MisEmpleadosComponent {
  empleados: EmpleadoDatosDto[] = [];
  constructor(private empleadosService: EmpleadoService) {}
  ngOnInit() {
    this.empleadosService.allEmpleados().subscribe(empleados => {
      console.log('Empleados:', empleados);
      this.empleados = empleados;
    });
  }
  eliminarEmpleado(dni: string) {
    this.empleadosService.deleteEmpleado(dni).subscribe({
      next: () => {
        console.log(`Empleado con DNI ${dni} eliminado correctamente.`);
        this.empleados = this.empleados.filter(empleado => empleado.dni !== dni);
      },
      error: (error) => {
        console.error(`Error al eliminar el empleado con DNI ${dni}:`, error);
      }
    });
  }


}
