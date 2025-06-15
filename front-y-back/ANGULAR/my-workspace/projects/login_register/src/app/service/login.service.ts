import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteDatosDto } from '../model/ClienteDatosDto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = 'http://localhost:3000/login';
  constructor(private http:HttpClient) { }


  findUsu(email:string,password:string):Observable<ClienteDatosDto>{

    const usuario =this.http.get<ClienteDatosDto>(`${this.url}/${email},${password}`)
    localStorage.setItem('usuario', JSON.stringify(usuario));
    return usuario;


  }
}
