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

  async highProduct(producto:ProductoAltaDto):Promise<boolean>{

    // Verifica si el empleado existe, si no, lo crea

    let articulo :Producto = await this.repositoryProducto.findOne({ where: { nombre: producto.nombre, descripcion: producto.descripcion} });
    if (!articulo) {
      articulo = this.repositoryProducto.create({
        
      });
      await this.repositoryProducto.save(articulo);

      return true;
    }
    else{
      return false;
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

  async modifyProduct(id:number, producto: ProductoAltaDto):Promise<boolean>{
    const result = await this.repositoryProducto.createQueryBuilder()
    .update(Producto)
    .set({ ...producto })
    .where("id_producto=:id ", 
      { id_producto:id })
    .execute();

    return result.affected && result.affected > 0;
  }

  //MOSTRAR TODOS LOS PRODUCTOS

  async findAllProduct(): Promise<ProductoDatosDto[]> {
    const productos = await this.repositoryProducto.find();
    const productosDto: ProductoDatosDto[] = [];

    for (const prods of productos) {
      productosDto.push(
        new ProductoDatosDto(
          prods.id_producto,
          prods.nombre,
          prods.descripcion,
          prods.precio,
          prods.stock
        )
      );
    }
    return productosDto;
  }
}
