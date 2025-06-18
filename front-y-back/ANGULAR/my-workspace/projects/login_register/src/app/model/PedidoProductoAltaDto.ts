

export class PedidoProductoAltaDto {
  id_pedido: number;
  id_producto: number;
  cantidad: number;

  constructor(id_pedido: number, id_producto: number, cantidad: number) {
    this.id_pedido = id_pedido;
    this.id_producto = id_producto;
    this.cantidad = cantidad;
  }
}
