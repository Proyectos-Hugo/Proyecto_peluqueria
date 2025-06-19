
export class ProductoDatosDto {

  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;

  constructor(id_producto?: number, nombre?: string, descripcion?: string, precio?: number, stock?: number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.id_producto = id_producto;
  }
}
