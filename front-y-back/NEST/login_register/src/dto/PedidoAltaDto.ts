import { IsDate, IsEmail, Length } from "class-validator";

export class PedidoAltaDto {
  @IsDate()
  fecha: Date;
  @IsEmail()
  @Length(10,40)
  clienteEmail: string;

  constructor(fecha: Date, clienteEmail: string) {
    this.fecha = fecha;
    this.clienteEmail = clienteEmail;
  }
}