
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../../../service/empleado.service';
import { EmpleadoDatosDto } from '../../../../model/EmpleadoDatosDto';
import { CitaService } from '../../../../service/cita.service';
import { CitaAltaEmpleadoDto } from '../../../../model/CitaAltaEmpleadoDto';

@Component({
  selector: 'app-nueva-cita-empleado',
  templateUrl: './nueva-cita-empleado.component.html',
  styleUrls: ['./nueva-cita-empleado.component.css'],
  imports: [CommonModule, FormsModule]
})
export class NuevaCitaEmpleadoComponent {

  constructor(private empleadoService: EmpleadoService, private citaService: CitaService){}
  email_cliente: string = '';
  nombre_cliente: string = '';
  telefono_cliente: string = '';
  dni_empleado: string = '';
  nombre_mascota: string = '';
  raza: string = '';
  edad: number | null = null;
  fecha: Date | null = null;
  hora: string = '';
  empleados: EmpleadoDatosDto[] = [];

  ngOnInit() {
    this.empleadoService.allEmpleados().subscribe(data => {
      this.empleados = data;
      console.log('Empleados cargados:', this.empleados);

    });
  }
  onSubmit() {
    const citaDTO = new CitaAltaEmpleadoDto(
      this.email_cliente,
      this.nombre_cliente,
      this.telefono_cliente,
      this.dni_empleado,
      this.nombre_mascota,
      this.raza,
      this.edad,
      this.fecha,
      this.hora
    )
    // Aquí puedes enviar la cita al backend o hacer lo que necesites
    console.log('Cita enviada:', citaDTO);
    this.citaService.crearCitaEmpleado(citaDTO).subscribe({
      next: (cita) => {
        console.log('Cita creada correctamente:', cita);
      },
      error: (error) => {
        console.error('Error al crear la cita:', error);
      }
    });
  }
}
