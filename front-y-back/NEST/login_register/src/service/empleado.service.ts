import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpleadoAltaDto } from 'src/dto/EmpeladoAltaDto';
import { EmpleadoDatosDto } from 'src/dto/EmpleadoDatosDto';
import { Empleado } from 'src/model/Empleado';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadoService {
  
  constructor(
    @InjectRepository(Empleado) private repositoryEmpleado: Repository<Empleado>
  ){}

  // BUSCAR EMPLEADOS

  allEmployees():Promise<EmpleadoDatosDto[]>{
    return this.repositoryEmpleado.find();
  }

  // ALTA EMPLEADO

  async highEmployees(empleadoNuevo: EmpleadoAltaDto):Promise<boolean>{
    // Verifica si el empleado existe, si no, lo crea
    let empleado :Empleado = await this.repositoryEmpleado.findOne({ where: { dni: empleadoNuevo.dni } });
    if (!empleado) {
      empleado = this.repositoryEmpleado.create(empleadoNuevo);
      await this.repositoryEmpleado.save(empleado);
      return true;
      }
    else{
      return false;
    }
  }

  //BAJA EMPLEADO

  async deleteEmployees(dni: string): Promise<boolean> {
    // Busca solo al empleado por su DNI
    const delet: Empleado = await this.repositoryEmpleado.findOne({
      where: { dni: dni }
    });

    if (delet) {
      // Elimina al empleado si existe
      await this.repositoryEmpleado.delete(delet.dni); 
      return true;
    } else {
      return false;
    }
  }
  
  
  //MODIFICAR EMPLEADO

  async modifyEmployees(dni:string, empleadoNuevo: EmpleadoAltaDto):Promise<boolean>{
      const result = await this.repositoryEmpleado.createQueryBuilder()
      .update(Empleado)
      .set({ ...empleadoNuevo })
      .where("dni=:dni", { dni:dni })
      .execute();

      return result.affected && result.affected > 0;
  }
  async findEmpleadoByDni(dni: string): Promise<EmpleadoDatosDto | boolean> {
    const empleado =  await this.repositoryEmpleado.findOneBy({ dni });
    if (empleado) {
      return new EmpleadoDatosDto(empleado.dni, empleado.email, empleado.password, empleado.nombre, empleado.apellido, empleado.especialidad, empleado.telefono);
    }
    return false;
  }
}

