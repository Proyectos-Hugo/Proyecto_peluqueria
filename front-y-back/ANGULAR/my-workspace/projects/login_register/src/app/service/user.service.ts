import { Injectable } from '@angular/core';
import { ClienteAltaDto } from '../model/ClienteAltaDto';
import { ClienteDatosDto } from '../model/ClienteDatosDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  cliente: any = null;

  constructor() {}

  setCliente(cliente: ClienteDatosDto): void {
    this.cliente = cliente;
  }

  getCliente(): ClienteDatosDto | null {
    if(!!this.cliente){
      return this.cliente;
    }
    else{
      this.cliente = JSON.parse(localStorage.getItem('cliente'));
      return this.cliente;
    }
  }
  removeUsuario():void{
    this.cliente = null;
  }
}
