import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ProductosService } from '../service/productos.service';
import { ProductoAltaDto } from 'src/dto/ProductoAltaDto';
import { Response } from 'express';
import { ProductoDatosDto } from 'src/dto/ProductoDatosDto';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductosService) {}

  @Post('altaProducto')
  async altaProducto(@Body() producto:ProductoAltaDto, @Res() res:Response){
    const alta = await this.productoService.highProduct(producto);

    if(alta){
      return res.status(201).json({
        message: "Se dio de alta el producto"
      });
    }else{
      return res.status(499).json({
        massage: "No se pudo de alta"
      });
    }
  }

  @Get('Productos')
  allProductos():Promise<ProductoDatosDto[]>{
    return this.productoService.findAllProduct();
  }

  @Delete('eliminarProductos/:id')
  async deleteProductos(@Param('id') id:number, @Res() res:Response){
    const delet = await this.productoService.deleteProduct(id);

    if(delet){
      return res.status(201).json({
        message: "Se borro el producto"
      });
    }else{
      return res.status(499).json({
        massage: "No se pudo borrar el producto"
      });
    }
  }

  @Patch('modificarProducto')
  modifyProductos(@Param('id') id:number, @Body() producto:ProductoAltaDto){
    return this.productoService.modifyProduct(id, producto);
  }
}
