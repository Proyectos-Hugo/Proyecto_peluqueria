import { MascotaDatosDto } from '../model/mascotaDatosDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MascotaAltaDto } from '../model/MascotaAltaDto';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(private http:HttpClient) { }

  url:string = 'http://localhost:3000/mascotas';

  findMascota(id:number):Observable<MascotaDatosDto>{
    return this.http.get<MascotaDatosDto>(`${this.url}/buscarMascota/${id}`);
  }

  altaMascota(mascota: MascotaAltaDto):Observable<MascotaDatosDto>{
    return this.http.post<MascotaDatosDto>(`${this.url}/altaMascota/`,mascota);
  }


  deleteMascota(id:number):Observable<MascotaDatosDto> {
    return this.http.delete<MascotaDatosDto>(`${this.url}/eliminarMascota/${id}`);
  }

  modifyMascota(id: number, mascota: Partial<MascotaDatosDto>): Observable<MascotaDatosDto> {
    return this.http.patch<MascotaDatosDto>(`${this.url}/modificarMascota/${id}`, mascota);
  }
}
