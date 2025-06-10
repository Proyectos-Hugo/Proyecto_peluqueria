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
import { CitaAltaDto } from 'src/dto/CitaAltaDto';
import { CitaService } from 'src/service/cita.service';
import {Response} from 'express';
import { CitaDto } from 'src/dto/CitaDto';


@Controller('citas')
export class CitaController {
  constructor(private readonly citaService: CitaService) {}


     @Get('todas')
    todasCitas():Promise<CitaDto[]>{
      return this.citaService.findAllCitas();
    }

 
    
        @Get('buscar-cita-por-cliente/:email')
      BuscarCitaPorCliente(@Param('email') email:string){
        return this.citaService.findQuotesByClient(email)
      }



    @Post('alta-cita')
    async altaCita(@Body() cita:CitaAltaDto, @Res() res:Response){
      const citaExiste = await this.citaService.highQuote(cita);
    if(citaExiste){
      return res.status(499).json(
      {
        message: 'Ya existe una cita en la hora seleccionada',
      });
    }else{
      return res.status(201).json({
        message: 'Cita creada'
      });
    }
      
    }

        @Patch('modificar-cita')
    modificarCita(@Body() cita:CitaAltaDto){
      return this.citaService.modifyQuote(cita);
    }



        @Delete('eliminar-cita')
        async EliminarCita(@Body() cita:CitaAltaDto, @Res() res:Response){
          const eli= await this.citaService.deleteQuote(cita);
          if(eli){
            return res.status(200).json({message:"has eliminado la cita con exito",});}
            else{
              return res.status(404).json({message:"no se encuentra la cita",});};
            }
          }
        







