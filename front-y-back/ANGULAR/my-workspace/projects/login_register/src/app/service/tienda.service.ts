import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})

export class TiendaService {
  private apiUrl = 'http://localhost:3000/tiendas';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/Productos`);
  }

  altaProducto(producto: Partial<Producto>): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/altaArticulo`, producto);
  }

  borrarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/borrarArticulo/${id}`);
  }
}
