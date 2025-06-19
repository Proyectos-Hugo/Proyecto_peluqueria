import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';
import { Cita } from './Cita';

@Entity('empleados')
export class Empleado {
  @PrimaryColumn()
  dni: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ nullable: true })
  especialidad: string;

  @Column({ nullable: true })
  telefono: string;

  @OneToOne(() => Usuario, usuario => usuario.empleado)
  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  usuario: Usuario;

  @OneToMany(() => Cita, cita => cita.empleado)
  citas: Cita[];

  constructor(
    dni?: string,
    email?: string,
    password?: string,
    nombre?: string,
    apellido?: string,
    especialidad?: string,
    telefono?: string
  ) {
    this.dni = dni ?? '';
    this.email = email ?? '';
    this.password = password ?? '';
    this.nombre = nombre ?? '';
    this.apellido = apellido ?? '';
    this.especialidad = especialidad ?? '';
    this.telefono = telefono ?? '';
  }
}