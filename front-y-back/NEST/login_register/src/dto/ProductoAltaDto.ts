import { IsInt, IsNumber, IsString, Length } from "class-validator";

export class ProductoAltaDto {
  @IsInt()
  id_producto?: number;
  @IsString()
  @Length(2,15)
  nombre: string;
  @IsString()
  @Length(0,500)
  descripcion: string;
  @IsNumber()
  precio: number;
  @IsInt()
  stock: number;

  constructor( nombre?: string, descripcion?: string, precio?: number, stock?: number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
  }
}