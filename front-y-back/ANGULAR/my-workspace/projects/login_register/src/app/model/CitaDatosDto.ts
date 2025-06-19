

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
  nombre_empleado: string;
  apellido_empleado: string;



  constructor(
    id_cita: number,
    email_cliente: string,
    nombre_cliente: string,
    telefono_cliente: string,
    dni_empleado:string,
    nombre_mascota:string,
    raza_mascota: string,
    fecha: Date,
    hora: string,
    nombre_empleado: string = '',
    apellido_empleado: string = ''
  ) {
    this.id_cita = id_cita;
    this.email_cliente = email_cliente;
    this.nombre_cliente = nombre_cliente;
    this.telefono_cliente = telefono_cliente;
    this.dni_empleado = dni_empleado
    this.nombre_mascota = nombre_mascota;
    this.raza_mascota = raza_mascota;
    this.fecha = fecha;
    this.hora = hora;
    this.nombre_empleado = nombre_empleado;
    this.apellido_empleado = apellido_empleado;
  }
}
