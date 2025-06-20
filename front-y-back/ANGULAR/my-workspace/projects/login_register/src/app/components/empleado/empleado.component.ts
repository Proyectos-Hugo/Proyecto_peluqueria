import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../service/empleado.service';
import { EmpleadoDatosDto } from '../../model/EmpleadoDatosDto';
import { EmpleadoAltaDto } from '../../model/EmpeladoAltaDto';

@Component({
  selector: 'app-empleado',
  imports: [FormsModule, CommonModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {
  // Alta de empleado
  dni: string = '';
  nombre: string = '';
  apellido: string = '';
  especialidad: string = '';
  telefono: number = null;
  email: string = '';
  password: string = '';

  // Modificar empleado
  encontrarDni: string = '';
  modificarEmail: string = '';
  modificarPassword: string = '';
  modificarNombre: string = '';
  modificarApellido: string = '';
  modificarEspecialidad: string = '';
  modificarTelefono: number = null;

  // Eliminar empleado
  eliminarDni: string = '';

  // Mensajes y datos
  mensajeAlta: string = '';
  empleados: EmpleadoDatosDto[] = [];

  constructor(private empleadoService: EmpleadoService) {}

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

  altaEmpleado() {
    const nuevoEmpleado = new EmpleadoAltaDto(
      this.dni,
      this.nombre,
      this.email,
      this.password,
      this.apellido,
      this.especialidad,
      this.telefono
    );
    this.empleadoService.altaEmpleado(nuevoEmpleado).subscribe({
      next: () => {
        this.mensajeAlta = 'Empleado creado correctamente.';
        this.limpiarFormularioAlta();
      },
      error: () => {
        this.mensajeAlta = 'Error al crear el empleado.';
      }
    });
  }

  modificarEmpleado() {
    const datosModificados: any = {
      email: this.modificarEmail,
      password: this.modificarPassword,
      nombre: this.modificarNombre,
      apellido: this.modificarApellido,
      especialidad: this.modificarEspecialidad,
      telefono: this.modificarTelefono
    };

    // Elimina campos vacíos o nulos
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
        this.limpiarFormularioModificar();
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
        this.eliminarDni = '';
      },
      error: () => {
        this.mensajeAlta = 'Error al eliminar el empleado.';
      }
    });
  }

  limpiarFormularioAlta() {
    this.dni = '';
    this.nombre = '';
    this.apellido = '';
    this.especialidad = '';
    this.telefono = null;
    this.email = '';
    this.password = '';
  }

  limpiarFormularioModificar() {
    this.encontrarDni = '';
    this.modificarEmail = '';
    this.modificarPassword = '';
    this.modificarNombre = '';
    this.modificarApellido = '';
    this.modificarEspecialidad = '';
    this.modificarTelefono = null;
  }
}
