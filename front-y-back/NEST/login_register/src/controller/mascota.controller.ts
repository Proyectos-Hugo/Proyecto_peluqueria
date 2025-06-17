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
import { MascotaService } from 'src/service/mascota.service';
import { Response } from 'express';
import { MascotaAltaDto } from 'src/dto/MascotaAltaDto';
import { MascotaDatosDto } from 'src/dto/MascotaDatosDto';


@Controller('mascotas')
export class MascotaController {
  constructor(private readonly mascotaService: MascotaService) {}

  @Post('altaMascota')
  async altaMascota(@Body() mascota:MascotaAltaDto, @Res() res:Response){
    const alta = await this.mascotaService.highAnimals(mascota);

    if(alta){
      return res.status(201).json({
        massage: "Dado de alta la mascota"
      });
    }else{
      return res.status(499).json({
        massage: "No se pudo dar de alta"
      });;
    }
  }

  @Get('buscarMascota/:id')
  allMascota(@Param('id') id_mascota:number):Promise<MascotaDatosDto[]>{
    return this.mascotaService.findMascotas(id_mascota);
  }

  @Delete('eliminarMascota/:id')
  async deleteMascotas(@Param('id') id:number, @Res() res:Response){
    const delet = await this.mascotaService.deleteAnimal(id);

    if(delet){
      return res.status(201).json({
        message: "Se borro la mascota"
      });
    }else{
      return res.status(499).json({
        message: "No se pudo borrar la mascota"
      });
    }
  }

  @Patch('modificarMascota/:id')
  modifyMascota(@Param('id') id:number,@Body() mascota:MascotaAltaDto){
    return this.mascotaService.modifyAnimals(id,mascota);
  }
}
