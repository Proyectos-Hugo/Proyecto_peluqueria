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
  telefono: string;

  @Column()
  password: string;

  @OneToMany(() => Mascota, mascota => mascota.cliente)
  mascotas: Mascota[];

  @OneToMany(() => Pedido, pedido => pedido.cliente)
  pedidos: Pedido[];

  constructor(email: string, nombre: string, apellido: string, telefono: string, password?: string) {
    this.email = email;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.password = password;
    
  }
}