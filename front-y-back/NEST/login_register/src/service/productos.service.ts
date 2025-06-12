import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoAltaDto } from 'src/dto/ProductoAltaDto';
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
      let articulo :Producto = await this.repositoryProducto.findOne({ where: { id_producto: producto.id_producto} });
      if (!articulo) {
        articulo = this.repositoryProducto.create({
          
        });
        await this.repositoryProducto.save(articulo);
      }
  
      const existe = await this.repositoryProducto.createQueryBuilder("empleado")
      .where("empleado.dni=:dni", { dni:emple.dni })
      .getOne()
      
      if(existe){
        return false;
      }else{
        const nuevoProducto = this.repositoryProducto.create(producto);
        await this.repositoryProducto.save(nuevoProducto);
        return true;
      }
    }
  
    //BAJA EMPLEADO
  
    async deleteEmployees(empleado:EmpleadoAltaDto):Promise<boolean>{
      const delet :Empleado = await this.repositoryEmpleado.createQueryBuilder("Empleado")
      .where("dni=:dni", { dni:empleado.dni})
      .getOne();
      
      if(delet){
        this.repositoryEmpleado.delete(delet);
        return true;
      }else{
        return false;
      }
    }
    
    //MODIFICAR EMPLEADO
  
    async modifyEmployees(empleado:EmpleadoAltaDto):Promise<boolean>{
      const result = await this.repositoryEmpleado.createQueryBuilder()
        .update(Empleado)
        .set({ ...empleado })
        .where("especialidad=:especialidad AND telefono=:telefono", { especialidad:empleado.especialidad, telefono:empleado.telefono })
        .execute();
  
      return result.affected && result.affected > 0;
    }
}
