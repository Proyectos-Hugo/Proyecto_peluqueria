import { EmpleadoDatosDto } from './../../../../../../../NEST/login_register/src/dto/EmpleadoDatosDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadosDatosDto } from '../model/EmpleadosDatosDto';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http:HttpClient) { }

  url:string= 'http://localhost3000';

  allEmpleados():Observable<EmpleadosDatosDto>{
    return this.http.get<EmpleadosDatosDto>(`${this.url}/Empleados`);
  }

  altaEmpleado(dni:string,nombre:string,apellido:string,especialidad:string, telefono:number):Observable<EmpleadoDatosDto>{
    const nuevoEmpleado = {
      dni,
      nombre,
      apellido,
      especialidad,
      telefono
    }
    return this.http.post<EmpleadoDatosDto>(`${this.url}/altaEmpleado/`,nuevoEmpleado);
  }

  deleteEmpleado(dni:string):Observable<EmpleadoDatosDto> {
    return this.http.delete<EmpleadoDatosDto>(`${this.url}/eliminarEmpleado/${dni}`);
  }

  modifyEmpleado(empleado: Partial<EmpleadoDatosDto>): Observable<EmpleadoDatosDto> {
    return this.http.patch<EmpleadoDatosDto>(`${this.url}/modificarEmpleado/`, empleado);
  }
}
