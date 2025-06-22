import { ProductoDatosDto } from "./ProductoDatosDto";
export class PedidoProductoDatosDto {
  id_pedido: number;
  producto: ProductoDatosDto;
  cantidad: number;

  constructor(id_pedido:number, producto: ProductoDatosDto, cantidad: number) {
    this.id_pedido = id_pedido;
    this.producto = producto;
    this.cantidad = cantidad;
  }
}
