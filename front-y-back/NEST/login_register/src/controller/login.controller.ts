import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Res,
  Post,
} from '@nestjs/common';
//IMPORTANTE IMPORTAR RESPONSE
import { Response } from 'express';
import { ClienteAltaDto } from 'src/dto/ClienteAltaDto';
import { ClienteDatosDto } from 'src/dto/ClienteDatosDto';
import { Cliente } from 'src/model/Cliente';
import { ClienteService } from 'src/service/cliente.service';

@Controller('login')
export class LoginController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('create')
  async create(@Body() user: ClienteAltaDto, @Res() res: Response):Promise<Response> {
    const creado = await this.clienteService.highClient(user);
    if(creado){
      return res.status(201).json(creado)
    }else{
      return res.status(500).json(
      {
        message: 'El usuario ya existe',
      });
    };
  }

  @Get(':email')
  async findOne(@Param('email') email: string, @Res() res: Response):Promise<Response> {

    var cliente: ClienteDatosDto|boolean = await this.clienteService.findOne(email);
    console.log(cliente);
    //comprobar que el cliente es Cliente
    if (cliente instanceof ClienteDatosDto) {
    // Asegúrate que ClienteDatosDto tiene constructor o crea un objeto simple
      const clientedto = new ClienteDatosDto(
        cliente.email,
        cliente.nombre,
        cliente.apellido,
        cliente.password,
        cliente.telefono,
      );
      return res.status(200).json(clientedto);
    }
    return res.status(404).json({ message: 'Cuenta no encontrada' });

  }
  
}