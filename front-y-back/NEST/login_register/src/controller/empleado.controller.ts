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
import { EmpleadoAltaDto } from 'src/dto/EmpeladoAltaDto';
import { EmpleadoService } from 'src/service/empleado.service';
import { Response } from 'express';
import { EmpleadoDatosDto } from 'src/dto/EmpleadoDatosDto';

@Controller('empleados')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Post('altaEmpleado')
  async altaCita(@Body() empleado:EmpleadoAltaDto, @Res() res:Response){
    const creada = await this.empleadoService.highEmployees(empleado);
    if(creada){
      return res.status(201).json({
        message: 'Cita creada',
      });
    }else{
      return res.status(499).json({
          message: 'Ya existe una cita en la hora seleccionada'
      });
    }
  }

  @Get('Empleados')
  allEmpleados():Promise<EmpleadoDatosDto>{
    return this.allEmpleados();
  }

  @Patch('modificarEmpleado')
  modifyEmpleado(@Body() empleado:EmpleadoAltaDto){
    return this.modifyEmpleado(empleado);
  }

  @Delete('eliminarEmpleado/:dni')
  async deleteEmpleado(@Param('dni') dni: string, @Res() res: Response) {
    const delet = await this.empleadoService.deleteEmployees(dni);
    if (delet) {
      return res.status(200).json({
        message: "Has eliminado al empleado"
      });
    } else {
      return res.status(404).json({
        message: "No se ha encontrado al empleado"
      });
    }
  }

}
