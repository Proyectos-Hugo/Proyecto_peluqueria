

export class EmpleadoAltaDto {
  dni: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: number;

  constructor(dni?: string, nombre?: string, apellido?: string, especialidad?: string, telefono?: number) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.especialidad = especialidad;
    this.telefono = telefono;
  }
}
