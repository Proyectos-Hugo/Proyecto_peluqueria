import { EmpleadoDatosDto } from './../../../../../../../NEST/login_register/src/dto/EmpleadoDatosDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadosDatosDto } from '../model/EmpleadosDatosDto';
import { EmpleadoAltaDto } from '../model/EmpeladoAltaDto';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http:HttpClient) { }

  url:string= 'http://localhost:3000/empleados';

  allEmpleados():Observable<EmpleadosDatosDto[]>{
    return this.http.get<EmpleadosDatosDto[]>(`${this.url}/Empleados`);
  }

  altaEmpleado(nuevoEmpleado:EmpleadoAltaDto):Observable<EmpleadoDatosDto>{
    return this.http.post<EmpleadoDatosDto>(`${this.url}/altaEmpleado/`,nuevoEmpleado);
  }

  deleteEmpleado(dni:string):Observable<EmpleadoDatosDto> {
    return this.http.delete<EmpleadoDatosDto>(`${this.url}/eliminarEmpleado/${dni}`);
  }

  modifyEmpleado(dni:string,empleado: Partial<EmpleadoDatosDto>): Observable<EmpleadoDatosDto> {
    return this.http.patch<EmpleadoDatosDto>(`${this.url}/modificarEmpleado/${dni}`, empleado);
  }
}
