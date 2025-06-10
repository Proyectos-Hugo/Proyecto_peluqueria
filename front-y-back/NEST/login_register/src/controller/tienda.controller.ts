import { ProductoAltaDto } from 'src/dto/ProductoAltaDto';
import { TiendaService } from './../service/tienda.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';



@Controller('tiendas')
export class TiendaController {
  constructor(private readonly tiendaService: TiendaService) {}

  //async obtenerTodos(): Promise<Producto[]> {
     // return await this.productoRepo.find();}

     @Get('Productos')
     mostrarTodos(){
      return this.tiendaService.obtenerTodos();
     }

     //async crearArticulo(dto: ProductoAltaDto): Promise<ProductoDatosDto> {
         //return await this.productoRepo.save(dto); }

         @Post('altaArticulo')
      altaArticulo(@Body() dto:ProductoAltaDto){
        return this.tiendaService.crearArticulo(dto);
      }

      //async eliminarArticulo(id: number): Promise<void> {
         // const resultado = await this.productoRepo.delete(id);
         // if (resultado.affected === 0) {
           // throw new NotFoundException("Artículo no encontrado");

      
           @Delete('borrarArticulo/:id')
      deleteArticulo(@Param('id') id:number){
        return this.tiendaService.eliminarArticulo(id);
      }




     


}