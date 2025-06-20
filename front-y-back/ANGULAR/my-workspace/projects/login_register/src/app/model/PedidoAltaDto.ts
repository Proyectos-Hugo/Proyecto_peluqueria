

export class PedidoAltaDto {

  fecha: Date;
  email_cliente: string;

  constructor(fecha: Date, email_cliente: string) {
    this.fecha = fecha;
    this.email_cliente = email_cliente;
  }
}
