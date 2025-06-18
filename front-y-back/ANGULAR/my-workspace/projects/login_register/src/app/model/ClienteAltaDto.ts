

export class ClienteAltaDto {
  email: string;
  nombre: string;
  apellido: string;
  password: string;
  telefono: string;

  constructor(email: string, telefono: string, nombre: string, apellido?: string, password?: string) {
    this.email = email;
    this.nombre = nombre;
    this.apellido = apellido;
    this.password = password;
    this.telefono = telefono;
  }
}
