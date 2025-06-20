import { Cita } from '../model/Cita';

export class CitaDatosDto {
  id_cita: number;
  email_cliente: string;
  nombre_cliente: string;
  telefono_cliente: string;
  dni_empleado: string;
  nombre_mascota:string;
  raza_mascota: string;
  fecha: Date;
  hora: string;

  constructor(
    cita: Cita,
    nombre_cliente: string,
    telefono_cliente: string,
    dni_empleado:string,
    nombre_mascota:string,
    raza_mascota: string,
  ) {
    this.id_cita = cita.id_cita;
    this.email_cliente = cita.email_cliente;
    this.nombre_cliente = nombre_cliente;
    this.telefono_cliente = telefono_cliente;
    this.dni_empleado = dni_empleado    
    this.nombre_mascota = nombre_mascota;
    this.raza_mascota = raza_mascota;
    this.fecha = cita.fecha;
    this.hora = cita.hora;
  }
}