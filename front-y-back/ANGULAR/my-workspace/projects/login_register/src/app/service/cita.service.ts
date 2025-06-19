import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CitaAltaClienteDto } from '../model/CitaAltaClienteDto';
import { CitaAltaEmpleadoDto } from '../model/CitaAltaEmpleadoDto';
import { CitaDatosDto } from '../model/CitaDatosDto';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  url:string = 'http://localhost:3000/citas';

  constructor(private http:HttpClient) { }

  crearCitaCliente(cita: CitaAltaClienteDto): Observable<any> {
    return this.http.post<any>(`${this.url}/alta-cita-cliente`, cita);
  }
  crearCitaEmpleado(cita: CitaAltaEmpleadoDto): Observable<any> {
    return this.http.post<any>(`${this.url}/alta-cita-empleado`, cita);
  }

  obtenerCitas(): Observable<CitaDatosDto[]> {
    return this.http.get<CitaDatosDto[]>(`${this.url}/todas`);
  }

  eliminarCita(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/eliminar-cita/${id}`);
  }
  getMisCitas(email: string): Observable<CitaDatosDto[]> {
    return this.http.get<CitaDatosDto[]>(`${this.url}/buscar-cita-por-cliente/${email}`);
  }
}

