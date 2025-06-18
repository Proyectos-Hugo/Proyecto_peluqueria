
export class ProductoAltaDto {
  id_producto?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  id_categoria:number;
  stock: number;

  constructor( nombre?: string, descripcion?: string, precio?: number,id_categoria?:number, stock?: number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.id_categoria = id_categoria;
    this.stock = stock;
  }
}
