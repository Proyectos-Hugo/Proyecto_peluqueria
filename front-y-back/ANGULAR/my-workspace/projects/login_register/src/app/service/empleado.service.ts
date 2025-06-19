import { EmpleadoDatosDto } from './../../../../../../../NEST/login_register/src/dto/EmpleadoDatosDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoAltaDto } from '../model/EmpeladoAltaDto';
import { ClienteDatosDto } from '../model/ClienteDatosDto';
import { UserDatosDto } from '../model/UserDatosDto';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http:HttpClient) { }
  empleado: EmpleadoDatosDto | null = null;
  url:string= 'http://localhost:3000/empleados';

  allEmpleados():Observable<EmpleadoDatosDto[]>{
    return this.http.get<EmpleadoDatosDto[]>(this.url);
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
  getEmpleadoByEmail(email: string): Observable<EmpleadoDatosDto> {
    return this.http.get<EmpleadoDatosDto>(`${this.url}/findEmpleado/${email}`);
  }
  getEmpleadoPorDni(dni: string): Observable<EmpleadoDatosDto> {
    return this.http.get<EmpleadoDatosDto>(`${this.url}/findEmpleadoByDni/${dni}`);
  }

  setEmpleado(empleado: EmpleadoDatosDto): void {
    this.empleado = empleado;
  }

  getEmpleado(): EmpleadoDatosDto | null {
    if(!this.empleado){
      return null;
    } else if (localStorage.getItem('empleado') === null) {
      return null;
    } else{
      this.empleado = JSON.parse(localStorage.getItem('empleado'));
      return this.empleado;
    }
  }
  removeEmpleado():void{
    this.empleado = null;
  }

}
