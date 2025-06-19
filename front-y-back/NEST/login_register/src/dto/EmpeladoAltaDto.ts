import { IsInt, IsString, Length } from "class-validator";

export class EmpleadoAltaDto {
  @IsString()
  @Length(9,9)
  dni: string;
  @IsString()
  @Length(10,40)
  email: string;
  @IsString()
  @Length(8,20)
  password: string;
  @IsString()
  @Length(2,15)
  nombre: string;
  @IsString()
  @Length(10,40)
  apellido: string;
  @IsString()
  especialidad: string;
  @IsInt()
  @Length(9,9)
  telefono: string;

  constructor(dni?: string, email?: string, password?: string, nombre?: string, apellido?: string, especialidad?: string, telefono?: string) {
    this.dni = dni;
    this.email = email;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.especialidad = especialidad;
    this.telefono = telefono;
  }
}