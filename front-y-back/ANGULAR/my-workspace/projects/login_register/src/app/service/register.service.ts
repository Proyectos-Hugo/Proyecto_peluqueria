import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url:string = 'http://localhost:3000/auth';
  constructor(private http:HttpClient) { }


  registerCliente(email: string, nombre: string, apellido: string, password: string, telefono: string): Observable<Cliente | any> {
    const nuevoCliente = {
      email,
      nombre,
      apellido,
      password,
      telefono
    };
    return this.http.post(`${this.url}/create/`, nuevoCliente);
  }
}
