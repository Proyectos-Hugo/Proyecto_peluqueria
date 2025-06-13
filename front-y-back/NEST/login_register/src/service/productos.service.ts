import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoAltaDto } from 'src/dto/ProductoAltaDto';
import { ProductoDatosDto } from 'src/dto/ProductoDatosDto';
import { Producto } from 'src/model/Producto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  
  constructor(
    @InjectRepository(Producto) private repositoryProducto: Repository<Producto>
  ){}
  
  // ALTA PRODUCTO  

  async highProduct(id:number):Promise<boolean>{

    // Verifica si el empleado existe, si no, lo crea
    let articulo :Producto = await this.repositoryProducto.findOne({ where: { id_producto:id} });
    if (!articulo) {
      articulo = this.repositoryProducto.create({
        
      });
      await this.repositoryProducto.save(articulo);
    }

    const existe = await this.repositoryProducto.createQueryBuilder("producto")
    .where("id_producto=:id_producto", { id_producto:id })
    .getOne()
    
    if(existe){
      return false;
    }else{
      const nuevoProducto = this.repositoryProducto.create(articulo);
      await this.repositoryProducto.save(nuevoProducto);
      return true;
    }
  }

  //BAJA PRODUCTO

  async deleteProduct(id:number):Promise<boolean>{
    const delet :Producto = await this.repositoryProducto.createQueryBuilder("producto")
    .where("id_producto=:id_producto", { id_producto:id})
    .getOne();
    
    if(delet){
      this.repositoryProducto.delete(delet);
      return true;
    }else{
      return false;
    }
  }
  
  //MODIFICAR PRODUCTO

  async modifyProduct(id:number):Promise<boolean>{
    let producto:ProductoAltaDto;
    if(producto.id_producto===id){
      const result = await this.repositoryProducto.createQueryBuilder()
      .update(Producto)
      .set({ ...producto })
      .where("descripcuion=:descripcion AND precio=:precio AND id_categoria=:id_categoria AND stock=:stock", 
        { descipcion:producto.descripcion, precio:producto.precio, id_categoria:producto.id_categoria, stock:producto.stock })
      .execute();

      return result.affected && result.affected > 0;
    }
  }

  //MOSTRAR TODOS LOS PRODUCTOS

  async findAllProduct(): Promise<ProductoDatosDto[]> {
    const productos = await this.repositoryProducto.find();
    const productoDto: ProductoDatosDto[] = [];

    for (const prods of productos) {
      productoDto.push(
        new ProductoDatosDto(
          prods.id_producto,
          prods.nombre,
          prods.descripcion,
          prods.precio,
          prods.stock
        )
      );
    }
    return productoDto;
  }
}
