import { Component } from '@angular/core';
import { CitaService } from '../../../../service/cita.service';
import { CitaDatosDto } from '../../../../model/CitaDatosDto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpleadoService } from '../../../../service/empleado.service';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css'],
  imports: [CommonModule, FormsModule]
})
export class MisCitasComponent  {
  citas: CitaDatosDto[] = [];
  constructor(private citasService: CitaService, private empleadoService: EmpleadoService) { }

  ngOnInit() {
    let email = JSON.parse(localStorage.getItem('cliente') || '{}').email;
    this.citasService.getMisCitas(email).subscribe(citas => {
      this.citas = citas;
      console.log('Citas obtenidas:', this.citas);
      this.citas.forEach(cita => {
        this.empleadoService.getEmpleadoPorDni(cita.dni_empleado).subscribe(empleado => {
          cita.nombre_empleado = empleado.nombre;
          cita.apellido_empleado = empleado.apellido;
          console.log('Empleado encontrado:', empleado);
        }, error => {
          console.error('Error al obtener el empleado:', error);
        });
      });
    });
  }
  eliminarCita(id: number) {
    this.citasService.eliminarCita(id).subscribe({
      next: () => {
        console.log('Cita eliminada correctamente');
        this.citas = this.citas.filter(c => c.id_cita !== id);
      },
      error: (error) => {
        console.error('Error al eliminar la cita:', error);
      }
    });
  }

}
