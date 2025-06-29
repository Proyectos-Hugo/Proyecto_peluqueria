import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoAltaDto } from 'src/dto/PedidoAltaDto';
import { PedidoProductoAltaDto } from 'src/dto/PedidoProductoAltaDto';
import { ProductoAltaDto } from 'src/dto/ProductoAltaDto';
import { ProductoDatosDto } from 'src/dto/ProductoDatosDto';
import { Pedido } from 'src/model/Pedido';
import { PedidoProducto } from 'src/model/PedidoProducto';
import { Producto } from 'src/model/Producto';
import { Repository } from 'typeorm';

@Injectable()
export class TiendaService {
  constructor(
    @InjectRepository(Producto) private readonly productoRepo: Repository<Producto>,
    @InjectRepository(Pedido) private readonly pedidoRepo: Repository<Pedido>,
    @InjectRepository(PedidoProducto) private readonly pedidoProductoRepo: Repository<PedidoProducto>, 
  ) {}

  // MUESTRA TODOS LOS PRODUCTOS
  async obtenerTodos(): Promise<Producto[]> {
    return await this.productoRepo.find();
  }

  // AÑADE UN NUEVO PRODUCTO
  async crearArticulo(dto: ProductoAltaDto): Promise<ProductoDatosDto> {
    const pedidoProducto = this.productoRepo.create(dto);
    
    return await this.productoRepo.save(pedidoProducto);
  }

  //ELIMINA UN PRODUCTO POR ID
  async eliminarArticulo(id: number): Promise<void> {
    const resultado = await this.productoRepo.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException("Artículo no encontrado");
    }
  }

  //CREA UN PEDIDO POR EMAIL
    async crearPedido(email: string): Promise<number> {
    const pedido = this.pedidoRepo.create({
      email_cliente: email,
      fecha: new Date(),
    });
    const pedidoGuardado = await this.pedidoRepo.save(pedido);
    return pedidoGuardado.id_pedido; 
  }

  //AÑADE UN PRODUCTO A UN PEDIDO
  async añadirProductoAlPedido(dto: PedidoProductoAltaDto):Promise<boolean>{
    const pedidoProducto = this.pedidoProductoRepo.create(dto);
    await this.pedidoProductoRepo.save(pedidoProducto).catch(error => {
       return false;
    });
    return true;
  }
}