import { IsEmail, IsInt, IsString, IsStrongPassword, Length } from "class-validator";

export class ClienteAltaDto {
  @IsEmail()
  @Length(20,50)
  email: string;
  @IsString()
  @Length(2,15)
  nombre: string;
  @IsString()
  @Length(10,40)
  apellido: string;
  @IsInt()
  @Length(9,9)
  telefono: string;
  @IsStrongPassword()
  @Length(8,16)
  password: string;

  constructor(email: string, nombre: string, apellido: string, telefono: string, password?: string) {
    this.email = email;
    this.nombre = nombre;
    this.apellido = apellido;
    this.password = password;
    this.telefono = telefono;
  }
}