
export class EmpleadoDatosDto {
  dni: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: number;

  constructor(dni: string, email: string, password: string, nombre: string, apellido: string, especialidad: string, telefono: number) {
    this.dni = dni;
    this.email = email;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.especialidad = especialidad;
    this.telefono = telefono;
  }
}
