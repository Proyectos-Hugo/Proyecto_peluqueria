import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from 'src/model/Empleado';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadoService {
  
  constructor(
    @InjectRepository(Empleado) private repositoryEmpleado: Repository<Empleado>
  ){}

  // ALTA EMPLEADO

  async highEmployees(dni:string):Promise<boolean>{

    // Verifica si el empleado existe, si no, lo crea
    let emple:Empleado;
    if(emple.dni===dni){
      let empleado :Empleado = await this.repositoryEmpleado.findOne({ where: { dni: emple.dni } });
      if (!empleado) {
        empleado = this.repositoryEmpleado.create({
          dni: emple.dni,
          nombre: emple.nombre,
          apellido: emple.apellido,
          especialidad: emple.especialidad,
          telefono: emple.telefono
        });
        await this.repositoryEmpleado.save(empleado);
      }
      const existe = await this.repositoryEmpleado.createQueryBuilder("empleado")
        .where("empleado.dni=:dni", { dni:emple.dni })
        .getOne()
        
      if(existe){
        return false;
      }else{
        const nuevoEmpleado = this.repositoryEmpleado.create(empleado);
        await this.repositoryEmpleado.save(nuevoEmpleado);
        return true;
      }
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

  async modifyEmployees(dni:string):Promise<boolean>{
    let empleado:Empleado;
    if(empleado.dni===dni){
      const result = await this.repositoryEmpleado.createQueryBuilder()
      .update(Empleado)
      .set({ ...empleado })
      .where("especialidad=:especialidad AND telefono=:telefono", { especialidad:empleado.especialidad, telefono:empleado.telefono })
      .execute();

      return result.affected && result.affected > 0;
    }
  }
}
