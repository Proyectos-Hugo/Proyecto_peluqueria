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

      return res.status(201).json({
        message: 'Usuario creado'
      })
    }else{
      return res.status(499).json(
      {
        message: 'El usuario ya existe',
      });
    };
  }

  @Get(':email,:password')
  async findOne(@Param('email') email: string, @Param('password') password: string, @Res() res: Response):Promise<Response> {
    console.log('a')
    console.log(email)
    console.log(password)
    var cliente: Cliente = await this.clienteService.findOne(email, password);
    console.log(cliente)
    if (cliente) {
    // Asegúrate que ClienteDatosDto tiene constructor o crea un objeto simple
    const clientedto = new ClienteDatosDto(
      cliente.email,
      cliente.nombre,
      cliente.apellido,
      cliente.password,
      cliente.telefono,
    );
    console.log(clientedto)
    return res.status(200).json(clientedto);
  } else {
    return res.status(404).json({ message: 'Cuenta no encontrada' });
  }
  }
  
}