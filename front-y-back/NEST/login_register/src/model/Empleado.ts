import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Cita } from './Cita';

@Entity('empleados')
export class Empleado {
  @PrimaryColumn({ unique: true })
  dni: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  especialidad: string;

  @Column()
  telefono: string;

  @OneToMany(() => Cita, cita => cita.empleado)
  citas: Cita[];

  constructor(dni?: string, nombre?: string, apellido?: string, especialidad?: string, telefono?: string) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.especialidad = especialidad;
    this.telefono = telefono;
  }
}