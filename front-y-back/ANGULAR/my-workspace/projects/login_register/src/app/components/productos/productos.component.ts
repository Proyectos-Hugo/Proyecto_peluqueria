import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductoAltaDto } from '../../model/ProductoAltaDto';
import { ProductoDatosDto } from '../../model/ProductoDatosDto';
import { ProductosService } from '../../service/productos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productos',
  imports: [FormsModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  idEliminar: number;
  nombre: string;
  precio: number;
  descripcion: string;
  productos: ProductoDatosDto[];
  productoSeleccionado: ProductoDatosDto | null = null;
  nuevonombre: string;
  nuevoprecio: number;
  nuevodescripcion: string;
  mensajeAlta:string;

  constructor(private productosService: ProductosService) {}

  // Crear un nuevo producto
  crearProducto() {
    const nuevoProducto = new ProductoAltaDto(
      this.nuevonombre,
      this.nuevodescripcion,
      this.nuevoprecio,
    );
    this.productosService.newProduct(nuevoProducto).subscribe({
      next: (producto) => {
        this.mostrarProductos();
        this.nuevonombre = '';
        this.nuevoprecio = null;
        this.nuevodescripcion = '';
      }
    });
  }

  // Mostrar todos los productos
  mostrarProductos() {
    this.productosService.allProduct().subscribe({
      next: (productos) => {
        this.productos = productos;
      }
    });
  }

  // Seleccionar un producto para modificar
  seleccionarProducto(producto: ProductoDatosDto) {
    this.productoSeleccionado = { ...producto };
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.descripcion = producto.descripcion;
  }

  // Modificar el producto seleccionado
  modificarProducto() {
    if (!this.productoSeleccionado) return;
    const productoModificado = {
      ...this.productoSeleccionado,
      nombre: this.nombre,
      precio: this.precio,
      descripcion: this.descripcion
    };
    this.productosService.modifyProducto(productoModificado).subscribe({
      next: () => {
        this.mostrarProductos();
        this.productoSeleccionado = null;
        this.nombre = '';
        this.precio = null;
        this.descripcion = '';
      }
    });
  }

  // Eliminar un producto por su ID
  eliminarProducto(idEliminar: number) {
    if (!idEliminar) return;
    this.productosService.deleteProduct(idEliminar).subscribe({
      next: () => {
        this.mostrarProductos();
        if (this.productoSeleccionado && this.productoSeleccionado.id_producto === idEliminar) {
          this.productoSeleccionado = null;
        }
      }
    });
  }
}
