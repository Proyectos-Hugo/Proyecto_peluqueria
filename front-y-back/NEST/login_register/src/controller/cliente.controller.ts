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
import { ClienteAltaDto } from 'src/dto/ClienteAltaDto';
import { ClienteService } from 'src/service/cliente.service';
import { Response } from 'express';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('altaCliente')
  async altaCliente(@Body()cliente:ClienteAltaDto, @Res() res:Response){
    const alta = await this.clienteService.highClient(cliente);

    if(alta){
      return res.status(201).json({
        massage: "Se dio de alta al cliente"
      });
    }else{
      return res.status(499).json({
        massage: "No de dio de alta al cliente"
      });
    }
  }

  @Get('clientes')
  allCLientes(){
    return this.clienteService.allClientes();
  }

  @Get('cliente/:email')
  findByOne(@Param('email')email:string){
    return this.clienteService.findOne(email);
  }

  @Delete('borrarCliente/:email')
  async deleteCliente(@Param('email') email:string, @Res() res:Response){
    const delet = await this.clienteService.deleteClient(email);

    if(delet){
      return res.status(201).json({
        massage: "Se borro correctamente"
      });
    }else{
      return res.status(499).json({
        massage: "No se pudo borrar correctamente"
      });
    }
  }

  @Patch('modificarCliente/:email')
  modifyCliente(@Param('email')email:string,cliente:ClienteAltaDto){
    return this.clienteService.modifyClient(email,cliente);
  }

}
