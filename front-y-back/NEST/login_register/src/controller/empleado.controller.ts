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
  async altaEmpleado(@Body() empleado:EmpleadoAltaDto, @Res() res:Response){
    const creada = await this.empleadoService.highEmployees(empleado);
    if(creada){
      return res.status(201).json({
        message: 'Empleado creada',
      });
    }else{
      return res.status(499).json({
          message: 'Ya existe un empleado'
      });
    }
  }

  @Get('')
  allEmpleados():Promise<EmpleadoDatosDto[]>{
    return this.empleadoService.allEmployees();
  }
  @Get('findEmpleado/:email')
  getEmpleadoByEmail(@Param('email') email:string):Promise<EmpleadoDatosDto>{
    return this.empleadoService.getEmployeesByEmail(email);
  }
    @Get('findEmpleadoByDni/:dni')
  getEmpleadoByDni(@Param('dni') dni:string):Promise<EmpleadoDatosDto>{
    return this.empleadoService.getEmployeesByDni(dni);
  }


  @Patch('modificarEmpleado/:dni')
  modifyEmpleado(@Param('dni') dni:string, @Body() empleado:EmpleadoAltaDto){
    return this.empleadoService.modifyEmployees(dni,empleado);
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
