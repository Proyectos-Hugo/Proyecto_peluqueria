import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Cliente } from './Cliente';
import { Empleado } from './Empleado';

@Entity('users')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string; // 'cliente', 'empleado' o 'admin'

  @OneToOne(() => Cliente, cliente => cliente.usuario)
  cliente: Cliente;

  @OneToOne(() => Empleado, empleado => empleado.usuario)
  empleado: Empleado;

  constructor(
    email?: string,
    password?: string,
    role?: string
  ) {
    this.email = email ?? '';
    this.password = password ?? '';
    this.role = role ?? '';
  }
}