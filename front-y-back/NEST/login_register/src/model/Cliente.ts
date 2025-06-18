import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Mascota } from './Mascota';
import { Cita } from './Cita';
import { Pedido } from './Pedido';

@Entity('clientes')
export class Cliente {
  @PrimaryColumn({ unique: true })
  email: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;
  
  @Column()
  password: string;

  @Column()
  telefono: string;

  @OneToMany(() => Mascota, mascota => mascota.cliente)
  mascotas: Mascota[];

  @OneToMany(() => Pedido, pedido => pedido.cliente)
  pedidos: Pedido[];

  constructor(email: string, nombre: string, apellido?: string, password?: string, telefono?: string) {
    this.email = email;
    this.nombre = nombre;
    this.apellido = apellido;
    this.password = password;
    this.telefono = telefono;
  }
}