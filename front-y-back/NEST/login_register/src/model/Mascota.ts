import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './Cliente';
import { Cita } from './Cita';

@Entity('mascotas')
export class Mascota {
  @PrimaryGeneratedColumn()
  id_mascota: number;

  @Column()
  email_cliente: string;

  @Column()
  nombre: string;

  @Column()
  raza: string;

  @Column()
  edad: number;

  @ManyToOne(() => Cliente, cliente => cliente.mascotas, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'email_cliente' }) 
  cliente: Cliente;

  @OneToMany(() => Cita, cita => cita.mascota)
  citas: Cita[];

  constructor(email_cliente: string, nombre: string, raza: string, edad: number) {
    this.email_cliente = email_cliente;
    this.nombre = nombre;
    this.raza = raza;
    this.edad = edad;
    
  }
}