import { Component } from '@angular/core';
import { TiendaService, Producto } from '../../service/tienda.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css',
  imports: [CommonModule, FormsModule]
})
export class TiendaComponent {
  // Variables para el formulario y la vista
  idProducto: number;
  productoEncontrado: Producto | null = null;
  productos: Producto[] = [];
  mensajeAlta: string = '';
  mensajeBaja: string = '';
  mensajeBuscar: string = '';
  idEliminar: number;
  nuevoProducto: Partial<Producto> = {
    nombre: '',
    descripcion: '',
    precio: null,
    imagen: ''
  };

  constructor(private tiendaService: TiendaService) {
    this.cargarProductos();
  }

  // Cargar todos los productos al iniciar
  cargarProductos() {
    this.tiendaService.getProductos().subscribe({
      next: (productos) => this.productos = productos,
      error: () => this.productos = []
    });
  }

  // Buscar producto por ID
  buscarProductoPorId() {
    if (!this.idProducto) {
      this.mensajeBuscar = 'Introduce un ID válido.';
      this.productoEncontrado = null;
      return;
    }
    const encontrado = this.productos.find(p => p.id === this.idProducto);
    if (encontrado) {
      this.productoEncontrado = encontrado;
      this.mensajeBuscar = '';
    } else {
      this.productoEncontrado = null;
      this.mensajeBuscar = 'Producto no encontrado.';
    }
  }

  // Alta de producto
  altaProducto() {
    if (!this.nuevoProducto.nombre || !this.nuevoProducto.descripcion || !this.nuevoProducto.precio || !this.nuevoProducto.imagen) {
      this.mensajeAlta = 'Completa todos los campos.';
      return;
    }
    this.tiendaService.altaProducto(this.nuevoProducto).subscribe({
      next: (producto) => {
        this.mensajeAlta = 'Producto creado correctamente.';
        this.nuevoProducto = { nombre: '', descripcion: '', precio: null, imagen: '' };
        this.cargarProductos();
      },
      error: () => {
        this.mensajeAlta = 'Error al crear el producto.';
      }
    });
  }

  // Baja de producto
  bajaProducto() {
    if (!this.idEliminar) {
      this.mensajeBaja = 'Introduce un ID válido.';
      return;
    }
    this.tiendaService.borrarProducto(this.idEliminar).subscribe({
      next: () => {
        this.mensajeBaja = 'Producto eliminado correctamente.';
        this.cargarProductos();
      },
      error: () => {
        this.mensajeBaja = 'Error al eliminar el producto.';
      }
    });
  }
}
