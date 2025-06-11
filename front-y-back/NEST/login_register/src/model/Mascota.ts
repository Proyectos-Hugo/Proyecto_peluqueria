import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { Cliente } from './Cliente';

@Entity('mascotas')
export class Mascota {
  @PrimaryGeneratedColumn()
  id_mascota: number;

  @Column()
  nombre: string;

  @Column()
  raza: string;

  @Column()
  edad: number;

  @Column()
  email_cliente: string;

  @ManyToOne(() => Cliente, cliente => cliente.mascotas)
  cliente: Cliente;



  constructor(nombre?: string, raza?: string, edad?: number, cliente?: Cliente) {
    this.nombre = nombre;
    this.raza = raza;
    this.edad = edad;
    this.cliente = cliente;
    if(cliente){
      this.email_cliente = cliente.email
    }
  }
}