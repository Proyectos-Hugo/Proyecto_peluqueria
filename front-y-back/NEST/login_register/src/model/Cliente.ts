import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';
import { Pedido } from './Pedido';
import { Cita } from './Cita';
import { Mascota } from './Mascota';

@Entity('clientes')
export class Cliente {
  @PrimaryColumn()
  email: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  apellido: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  telefono: string;

  @OneToOne(() => Usuario, usuario => usuario.cliente)
  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  usuario: Usuario;

  @OneToMany(() => Pedido, pedido => pedido.cliente)
  pedidos: Pedido[];

  @OneToMany(() => Cita, cita => cita.cliente)
  citas: Cita[];

  @OneToMany(() => Mascota, mascota => mascota.cliente)
  mascotas: Mascota[];

  constructor(
    email?: string,
    nombre?: string,
    apellido?: string,
    password?: string,
    telefono?: string
  ) {
    this.email = email ?? '';
    this.nombre = nombre ?? '';
    this.apellido = apellido ?? '';
    this.password = password ?? '';
    this.telefono = telefono ?? '';
  }
}