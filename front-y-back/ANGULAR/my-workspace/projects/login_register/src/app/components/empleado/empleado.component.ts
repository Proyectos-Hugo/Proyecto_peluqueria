import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../service/empleado.service';
import { EmpleadoDatosDto } from '../../../../../../../../NEST/login_register/src/dto/EmpleadoDatosDto';
import { EmpleadoAltaDto } from '../../model/EmpeladoAltaDto';

@Component({
  selector: 'app-empleado',
  imports: [FormsModule,CommonModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {


  constructor(private empleadoService:EmpleadoService){}

  dni:string;
  nombre:string;
  apellido:string;
  especialidad:string;
  telefono:number;
  eliminarDni:string;
  encontrarDni:string;
  nuevoEmpleado:EmpleadoDatosDto;
  modificarEmpleadoData:EmpleadoDatosDto;
  empleados;
  modificarEspecialidad:string;
  modificarTelefono:number;
  mensajeAlta:string;

  mostrarTodosEmpleados() {
    this.empleadoService.allEmpleados().subscribe({
      next: empleados => {
        this.empleados = empleados;
      },
      error: () => {
        this.mensajeAlta = 'Error al cargar los empleados.';
      }
    });
  }

  altaEmpleado(){
    let nuevoEmpleado = new EmpleadoAltaDto(this.dni,this.nombre,this.apellido,this.especialidad,this.telefono)
    this.empleadoService.altaEmpleado(nuevoEmpleado)
    .subscribe({
      next: empleado => {
      this.mensajeAlta = 'Mascota creada correctamente.';
      this.dni = '';
      this.nombre = '';
      this.apellido = '';
      this.especialidad = '';
      this.telefono = null;
    },
      error: err => {
        this.mensajeAlta = 'Error al crear la mascota.';
      }
    });
  }

  modificarEmpleado() {
    const datosModificados: any = {
      especialidad: this.modificarEspecialidad,
      telefono: this.modificarTelefono
    };

    // Elimina campos vacíos
    Object.keys(datosModificados).forEach(
      key => (datosModificados[key] === '' || datosModificados[key] === null) && delete datosModificados[key]
    );

    if (Object.keys(datosModificados).length === 0) {
      this.mensajeAlta = 'Introduce al menos un campo para modificar.';
      return;
    }

    this.empleadoService.modifyEmpleado(this.encontrarDni, datosModificados).subscribe({
      next: (resultado) => {
        this.mensajeAlta = resultado ? 'Empleado modificado correctamente.' : 'No se pudo modificar el empleado.';
      },
      error: () => {
        this.mensajeAlta = 'Error al modificar el empleado.';
      }
    });
  }


  eliminarEmpleado() {
    this.empleadoService.deleteEmpleado(this.eliminarDni).subscribe({
      next: (resultado) => {
        this.mensajeAlta = resultado ? 'Empleado eliminado correctamente.' : 'No se pudo eliminar el empleado.';
      },
      error: () => {
        this.mensajeAlta = 'Error al eliminar el empleado.';
      }
    });
  }
}
