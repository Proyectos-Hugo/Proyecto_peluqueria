import { ProductoDatosDto } from "./ProductoDatosDto";



export class PedidoProductoDatosDto {
  id_pedido: number;
  producto: ProductoDatosDto;
  cantidad: number;

  constructor( producto: ProductoDatosDto, cantidad: number) {
    this.producto = producto;
    this.cantidad = cantidad;
  }
}
