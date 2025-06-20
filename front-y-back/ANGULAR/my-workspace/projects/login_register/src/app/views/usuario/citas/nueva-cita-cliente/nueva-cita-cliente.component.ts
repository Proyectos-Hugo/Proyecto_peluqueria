import { Component } from '@angular/core';
import { CitaAltaClienteDto } from '../../../../model/CitaAltaClienteDto';
import { CitaService } from '../../../../service/cita.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MascotaService } from '../../../../service/mascota.service';
import { MascotaDatosDto } from '../../../../model/MascotaDatosDto';
import { EmpleadoService } from '../../../../service/empleado.service';
import { EmpleadoDatosDto } from '../../../../model/EmpleadoDatosDto';

@Component({
  selector: 'app-nueva-cita-cliente',
  templateUrl: './nueva-cita-cliente.component.html',
  styleUrls: ['./nueva-cita-cliente.component.css'],
  imports: [FormsModule, CommonModule]
})
export class NuevaCitaClienteComponent {
  email_cliente: string = '';
  nombre_cliente: string = '';
  telefono_cliente: string = '';
  dni_empleado: string = '';
  id_mascota: number | null = null;
  fecha: string = '';
  hora: string = '';
  mascotas: MascotaDatosDto[] = []; // Cambia el tipo según tu modelo de mascota
  empleados: EmpleadoDatosDto[] = []; // Cambia el tipo según tu modelo de empleado

  constructor(private empleadoService: EmpleadoService, private citaService: CitaService, private mascotasService: MascotaService) {}
  ngOnInit() {
    const cliente = JSON.parse(localStorage.getItem('cliente') || '{}');
    this.email_cliente = cliente.email || '';
    this.mascotasService.getMascotasPorEmail(this.email_cliente).subscribe(mascotas => {
      this.mascotas = mascotas;
      // Asumiendo que quieres la primera mascota
      console.log('Mascotas cargadas:', this.mascotas);
    });
    this.empleadoService.allEmpleados().subscribe(data => {
      this.empleados = data;
      console.log('Empleados cargados:', this.empleados);
    });
  }
  onSubmit() {
    // Puedes agregar validaciones adicionales aquí si lo necesitas
    const citaDto = new CitaAltaClienteDto(
      this.email_cliente,
      this.dni_empleado,
      this.id_mascota!,
      this.fecha as any, // Ajusta si tu DTO espera Date, puedes hacer new Date(this.fecha)
      this.hora
    );
    citaDto.nombre_cliente = this.nombre_cliente;
    citaDto.telefono_cliente = this.telefono_cliente;

    this.citaService.crearCitaCliente(citaDto).subscribe({
      next: (respuesta) => {
        console.log('Cita creada correctamente:', respuesta);
        // Aquí puedes limpiar el formulario o mostrar un mensaje de éxito
      },
      error: (error) => {
        console.error('Error al crear la cita:', error);
        // Aquí puedes mostrar un mensaje de error
      }
    });
  }
}
