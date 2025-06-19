import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { MascotaService } from 'src/service/mascota.service';
import { Response } from 'express';
import { MascotaAltaDto } from 'src/dto/MascotaAltaDto';


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

  @Get('buscarMascotaPorEmail/:email')
  async mascotaPorEmail(@Param('email') email: string, @Res()res :Response){
    const mascotas = await this.mascotaService.getMascotasPorEmail(email);
    if(mascotas.length>0){
      return res.status(200).json(mascotas);
    }else{
      return res.status(499).json({
        message: "No se encontro la mascota"
      });
    }
  }
    @Get('buscarMascota/:id')
  async mascotaPorId(@Param('id') id: number, @Res()res :Response){
    const mascotas = await this.mascotaService.getMascotasPorId(id);
    if(mascotas.length>0){
      return res.status(200).json(mascotas);
    }else{
      return res.status(499).json({
        message: "No se encontro la mascota"
      });
    }
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

  @Put('modificarMascota/:id')
  modifyMascota(@Param('id') id:number,@Body() mascota:MascotaAltaDto,@Res() res: Response){
    const modify = this.mascotaService.modifyAnimals(id, mascota);
    if(modify){
      return res.status(201).json({
        message: "Se modifico la mascota"
      });
    }else{
      return res.status(404).json({
        message: "No se pudo modificar la mascota"
      });
    }
  }
}
