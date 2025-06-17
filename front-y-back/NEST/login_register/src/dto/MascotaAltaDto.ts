import { IsEmail, IsInt, IsString, Length } from "class-validator";

export class MascotaAltaDto {
  @IsEmail()
  @Length(10,40)
  email_cliente: string;
  @IsString()
  @Length(2,15)
  nombre: string;
  @IsString()
  @Length(2,10)
  raza: string;
  @IsInt()
  edad: number;


  constructor(email_cliente: string, nombre: string, raza: string, edad?: number) {
    this.email_cliente = email_cliente;
    this.nombre = nombre;
    this.raza = raza;
    this.edad = edad;
    
  }
}