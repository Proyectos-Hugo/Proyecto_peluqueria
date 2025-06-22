import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoAltaDto } from '../model/ProductoAltaDto';
import { Observable } from 'rxjs';
import { ProductoDatosDto } from '../model/ProductoDatosDto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
constructor(private http:HttpClient) { }

  url:string= 'http://localhost:3000/productos';

  allProduct():Observable<ProductoAltaDto[]>{
    return this.http.get<ProductoAltaDto[]>(`${this.url}/Productos`);
  }
  newProduct(nuevoProducto:ProductoAltaDto):Observable<ProductoAltaDto>{
    return this.http.post<ProductoAltaDto>(`${this.url}/altaProducto/`,nuevoProducto);
  }
  deleteProduct(id:number):Observable<ProductoAltaDto> {
    return this.http.delete<ProductoAltaDto>(`${this.url}/eliminarProductos/${id}`);
  }
  modifyProducto(producto: Partial<ProductoDatosDto>): Observable<ProductoDatosDto> {
    return this.http.patch<ProductoDatosDto>(`${this.url}/modificarProducto`, producto);
  }
}
