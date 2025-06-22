import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpleadoAltaDto } from 'src/dto/EmpeladoAltaDto';
import { EmpleadoDatosDto } from 'src/dto/EmpleadoDatosDto';
import { UserAltaDto } from 'src/dto/UserAltaDto';
import { Empleado } from 'src/model/Empleado';
import { Usuario } from 'src/model/Usuario';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadoService {
  
  constructor(
    @InjectRepository(Empleado) private repositoryEmpleado: Repository<Empleado>,
    @InjectRepository(Usuario) private repositoryUsuario: Repository<Usuario>
  ){}

  // BUSCAR EMPLEADOS
  allEmployees():Promise<EmpleadoDatosDto[]>{
    return this.repositoryEmpleado.find();
  }

  // ALTA EMPLEADO
  async highEmployees(empleadoNuevo: EmpleadoAltaDto):Promise<boolean>{
    let empleado :Empleado = await this.repositoryEmpleado.findOne({ where: { dni: empleadoNuevo.dni } });
    if (!empleado) {
      empleado = this.repositoryEmpleado.create(empleadoNuevo);
      await this.repositoryEmpleado.save(empleado);
      await this.repositoryUsuario.save(new UserAltaDto(empleadoNuevo.email, empleadoNuevo.password, 'empleado'));
      return true;
    }else{
      return false;
    }
  }

  //BAJA EMPLEADO
  async deleteEmployees(dni: string): Promise<boolean> {
    const delet: Empleado = await this.repositoryEmpleado.findOne({
      where: { dni: dni }
    });

    if(delet){
      await this.repositoryEmpleado.delete(delet.dni); 
      return true;
    }else{
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

  //MUESTRA EL EMPLEADO BUSCADO POR DNI
  async findEmpleadoByDni(dni: string): Promise<EmpleadoDatosDto | boolean> {
    const empleado =  await this.repositoryEmpleado.findOneBy({ dni });
    if (empleado) {
      return new EmpleadoDatosDto(empleado.dni, empleado.email, empleado.password, empleado.nombre, empleado.apellido, empleado.especialidad, empleado.telefono);
    }
    return false;
  }
  
  //
  async getEmployeesByEmail(email: string): Promise<EmpleadoDatosDto> {
    const empleado = await this.repositoryEmpleado.findOne({ where: { email } });
    if (empleado) {
      return new EmpleadoDatosDto(empleado.dni, empleado.email, empleado.password, empleado.nombre, empleado.apellido, empleado.especialidad, empleado.telefono);
    }
    return null;
  }
}