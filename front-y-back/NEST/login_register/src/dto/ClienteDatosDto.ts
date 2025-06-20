import { IsEmail, IsInt, IsString, IsStrongPassword, Length } from "class-validator";

export class ClienteDatosDto {
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  password: string;

  constructor(email: string, nombre: string, apellido: string, telefono: string, password?:string) {
    this.email = email;
    this.nombre = nombre;
    this.apellido = apellido;
    this.password = password;
    this.telefono = telefono;
  }
}