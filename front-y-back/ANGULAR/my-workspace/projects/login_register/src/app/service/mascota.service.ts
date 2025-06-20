
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MascotaDatosDto } from '../model/MascotaDatosDto';
import { MascotaAltaDto } from '../model/MascotaAltaDto';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private apiUrl = 'http://localhost:3000/mascotas';

  constructor(private http: HttpClient) {}
  getMascotasPorEmail(email: string): Observable<MascotaDatosDto[]> {
    return this.http.get<MascotaDatosDto[]>(`${this.apiUrl}/buscarMascotaPorEmail/${email}`);
  }
  findMascota(id: number): Observable<MascotaDatosDto> {
    return this.http.get<MascotaDatosDto>(`${this.apiUrl}/buscarMascota/${id}`);
  }

  altaMascota(mascota: MascotaAltaDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/altaMascota`, mascota);
  }

  deleteMascota(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminarMascota/${id}`);
  }

  modifyMascota(id: number, mascota: MascotaAltaDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modificarMascota/${id}`, mascota);
  }
}
