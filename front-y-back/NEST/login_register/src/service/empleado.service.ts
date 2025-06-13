import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpleadoAltaDto } from 'src/dto/EmpeladoAltaDto';
import { Empleado } from 'src/model/Empleado';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadoService {
  
  constructor(
    @InjectRepository(Empleado) private repositoryEmpleado: Repository<Empleado>
  ){}

  // ALTA EMPLEADO

  async highEmployees(empleadoNuevo: EmpleadoAltaDto):Promise<boolean>{
    // Verifica si el empleado existe, si no, lo crea
    let empleado :Empleado = await this.repositoryEmpleado.findOne({ where: { dni: empleadoNuevo.dni } });
    if (!empleado) {
      empleado = this.repositoryEmpleado.create(empleado);
      await this.repositoryEmpleado.save(empleado);
      return true;
      }
    else{
      return false;
    }
  }

  //BAJA EMPLEADO

  async deleteEmployees(dni:string):Promise<boolean>{
    const delet :Empleado = await this.repositoryEmpleado.createQueryBuilder("Empleado")
    .where("dni=:dni", { dni:dni})
    .getOne();
    
    if(delet){
      this.repositoryEmpleado.delete(delet);
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
}