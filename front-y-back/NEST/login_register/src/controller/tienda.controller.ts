import { ProductoAltaDto } from 'src/dto/ProductoAltaDto';
import { TiendaService } from './../service/tienda.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';

@Controller('tiendas')
export class TiendaController {
  constructor(private readonly tiendaService: TiendaService) {}

  @Get('Productos')
  mostrarTodos(){
    return this.tiendaService.obtenerTodos();
  }

  @Post('altaArticulo')
  altaArticulo(@Body() dto:ProductoAltaDto){
    return this.tiendaService.crearArticulo(dto);
  }
      
  @Delete('borrarArticulo/:id')
  deleteArticulo(@Param('id') id:number){
    return this.tiendaService.eliminarArticulo(id);
  }
}