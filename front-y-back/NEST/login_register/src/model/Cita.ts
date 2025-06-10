import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Mascota } from './Mascota';
import { Empleado } from './Empleado';
import { Cliente } from './Cliente';
@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn()
  id_cita: number;

  @Column()
  email_cliente: string;

  @Column()
  dni_empleado: string;

  @Column()
  id_mascota: number;

  @Column()
  fecha: Date;

  @Column()
  hora: string;
  

  @ManyToOne(()=>Cliente, cliente => cliente.email)
  @JoinColumn({name: 'email_cliente', referencedColumnName: 'email' })
  cliente: Cliente;

  @ManyToOne(() => Empleado, empleado => empleado.citas)
  @JoinColumn({ name: 'dni_empleado', referencedColumnName: 'dni' })
  empleado: Empleado;


  constructor(cliente?: Cliente, empleado?: Empleado, fecha?: Date, hora?: string) {
    
    if(cliente){
      this.cliente = cliente;
      this.email_cliente = cliente.email;
    }
    
    if(empleado){
      this.empleado = empleado;
      this.dni_empleado = empleado.dni;
    }
    this.fecha = fecha;
    this.hora = hora;
  }
}
