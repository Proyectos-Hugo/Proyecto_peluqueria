import { IsDate, IsEmail, Length } from "class-validator";

export class PedidoAltaDto {
  @IsDate()
  fecha: Date;
  @IsEmail()
  @Length(10,40)
  email_cliente: string;

  constructor(fecha: Date, email_cliente: string) {
    this.fecha = fecha;
    this.email_cliente = email_cliente;
  }
}