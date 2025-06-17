import { MascotaDatosDto } from '../model/mascotaDatosDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(private http:HttpClient) { }

  url:string = 'http://localhost:3000/mascotas';

  findMascota(id:number):Observable<MascotaDatosDto>{
    return this.http.get<MascotaDatosDto>(`${this.url}/buscarMascota/${id}`);
  }

  altaMascota(email:string,nombre:string,raza:string,edad:number):Observable<MascotaDatosDto>{
    const nuevaMascota = {
      email,
      nombre,
      raza,
      edad
    }
    return this.http.post<MascotaDatosDto>(`${this.url}/altaMascota/`,nuevaMascota);
  }

  deleteMascota(id:number):Observable<MascotaDatosDto> {
    return this.http.delete<MascotaDatosDto>(`${this.url}/eliminarMascota/${id}`);
  }

  modifyMascota(id: number, mascota: Partial<MascotaDatosDto>): Observable<MascotaDatosDto> {
    return this.http.patch<MascotaDatosDto>(`${this.url}/modificarMascota/${id}`, mascota);
  }
}
