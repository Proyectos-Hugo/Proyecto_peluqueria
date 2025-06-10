import { Cita } from '../model/Cita';

export class CitaDatosDto {
  id_cita: number;
  email_cliente: string;
  nombre_cliente: string;
  telefono_cliente: string;
  dni_empleado: string;
  id_mascota: number;
  fecha: Date;
  hora: string;

  constructor(
    cita: Cita,
    nombre_cliente: string,
    telefono_cliente: string
  ) {
    this.id_cita = cita.id_cita;
    this.email_cliente = cita.email_cliente;
    this.nombre_cliente = nombre_cliente;
    this.telefono_cliente = telefono_cliente;
    this.dni_empleado = cita.dni_empleado;
    this.id_mascota = cita.id_mascota;
    this.fecha = cita.fecha;
    this.hora = cita.hora;
  }
}