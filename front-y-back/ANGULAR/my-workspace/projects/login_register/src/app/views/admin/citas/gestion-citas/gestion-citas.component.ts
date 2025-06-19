import { Component } from '@angular/core';
import { CitaService } from '../../../../service/cita.service';
import { EmpleadoService } from '../../../../service/empleado.service';
import { CitaDatosDto } from '../../../../model/CitaDatosDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-citas',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-citas.component.html',
  styleUrls: ['./gestion-citas.component.css']
})
export class GestionCitasComponent {
  citas: CitaDatosDto[] = [];
  empleados: any[] = []; // Puedes definir un tipo más específico si lo deseas
  constructor(private citasService: CitaService, private empleadosService: EmpleadoService) {}
  ngOnInit() {
    this.citasService.obtenerCitas().subscribe(citas => {
      this.citas = citas;
      console.log('Citas obtenidas:', this.citas);
      this.empleadosService.allEmpleados().subscribe({
        next: (empleados) => {
          this.empleados = empleados;
          console.log('Empleados obtenidos:', this.empleados);
        },
        error: (error) => {
          console.error('Error al obtener los empleados:', error);
        }
      });
    }, error => {
      console.error('Error al obtener las citas:', error);
    });

  }
  eliminarCita(id: number) {
    this.citasService.eliminarCita(id).subscribe({
      next: () => {

        console.log('Cita eliminada correctamente');
        // Actualizar la lista de citas después de eliminar
        this.citas = this.citas.filter(cita => cita.id_cita !== id);
      },
      error: (error) => {
        console.error('Error al eliminar la cita:', error);
      }
    });
  }

}
