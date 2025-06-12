import { IsEmail, IsInt, IsString, Length } from "class-validator";

export class MascotaDatosDto {
  id_mascota?: number;
  nombre: string;
  raza: string;
  edad: number;
  email_cliente: string;

  constructor(nombre?: string, raza?: string, edad?: number, email_cliente?: string, id_mascota?: number) {
    this.nombre = nombre;
    this.raza = raza;
    this.edad = edad;
    this.email_cliente = email_cliente;
    this.id_mascota = id_mascota;
  }
}