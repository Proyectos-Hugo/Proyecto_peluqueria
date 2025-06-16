import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../service/empleado.service';
import { EmpleadoDatosDto } from '../../../../../../../../NEST/login_register/src/dto/EmpleadoDatosDto';

@Component({
  selector: 'app-empleado',
  imports: [FormsModule,CommonModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {


  constructor(private empleadoService:EmpleadoService){}

  buscarDni:string;
  eliminarDni:string;
  nuevoEmpleado:EmpleadoDatosDto;
  modificarEmpleadoData:EmpleadoDatosDto;
  empleados;

  mostrarTodosEmpleados(){
    this.empleados = this.empleadoService.allEmpleados();
    return this.empleados;
  }

  altaEmpleado(){
    const empleado = this.empleadoService.altaEmpleado(
      this.nuevoEmpleado.dni,
      this.nuevoEmpleado.nombre,
      this.nuevoEmpleado.apellido,
      this.nuevoEmpleado.especialidad,
      Number(this.nuevoEmpleado.telefono)
    )
  }

  modificarEmpleado(){
    return this.empleadoService.modifyEmpleado(this.modificarEmpleadoData);
  }

  eliminarEmpleado(){
    return this.empleadoService.deleteEmpleado(this.eliminarDni);
  }
}
