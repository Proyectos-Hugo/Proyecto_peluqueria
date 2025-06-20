

export class ClienteDatosDto {
  email: string;
  nombre: string;
  apellido: string;
  password: string;
  telefono: string;

  constructor(email: string, nombre: string, apellido: string, password: string, telefono: string) {
    this.email = email;
    this.nombre = nombre;
    this.apellido = apellido;
    this.password = password;
    this.telefono = telefono;
  }
}
