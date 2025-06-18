import { Cita } from './../model/Cita';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitaDatosDto } from 'src/dto/CitaDatosDto';
import { ClienteAltaDto } from 'src/dto/ClienteAltaDto';
import { Repository } from 'typeorm';
import { ClienteService } from './cliente.service';
import { CitaAltaClienteDto } from 'src/dto/CitaAltaClienteDto';
import { CitaAltaEmpleadoDto } from 'src/dto/CitaAltaEmpleadoDto';
import { CitaAltaDto } from 'src/dto/CitaAltaDto';
import { MascotaAltaDto } from 'src/dto/MascotaAltaDto';
import { MascotaService } from './mascota.service';
import { EmpleadoService } from './empleado.service';
import { Mascota } from 'src/model/Mascota';
import { Cliente } from 'src/model/Cliente';
import { ClienteDatosDto } from 'src/dto/ClienteDatosDto';


@Injectable()
export class CitaService {
  
  constructor(
    @InjectRepository(Cita) private repositoryCita:Repository<Cita>,
    private clienteService: ClienteService,
    private mascotasService: MascotaService,
    private empleadosService: EmpleadoService
  ){}

  // Devolucion de todas las citas
  async findAllCitas(): Promise<CitaDatosDto[]> {
    const citas = await this.repositoryCita.find();
    const citasDto: CitaDatosDto[] = [];

    for (const cita of citas) {
      const cliente = await this.clienteService.findClienteByEmail(cita.email_cliente);
      const empleado = await this.empleadosService.findEmpleadoByDni(cita.dni_empleado);
      const mascota = await this.mascotasService.findMascotas(cita.id_mascota);
      citasDto.push(
        new CitaDatosDto(
          cita,
          cliente?.nombre ?? '',
          cliente?.telefono ?? '',
          empleado?.dni ?? '',
          mascota?.nombre ?? '',
          mascota?.raza ?? '',

        )
      );
    }

    return citasDto;
  }

  // Devover las citas de un cliente
  async findQuotesByClient(email: string): Promise<CitaDatosDto[]> {
    const citas = await this.repositoryCita.find({
      where: { email_cliente: email },
      relations: ['empleado', 'mascota']
    });
    if (citas) {
      const cliente = await this.clienteService.findClienteByEmail(email);
      return citas.map(cita => 
        new CitaDatosDto(
          cita,
          cliente?.nombre ?? '',
          cliente?.telefono ?? '',
          cita.empleado?.dni ?? '',
          cita.mascota?.nombre ?? '',
          cita.mascota?.raza ?? ''
        )
      );
    }
    return [];
  }

  // Alta de una cita
    async highQuoteByClient(cita:CitaAltaClienteDto):Promise<boolean>{

      const fechaStr = cita.fecha instanceof Date
      ? cita.fecha.toISOString().slice(0, 10)
      : cita.fecha;

      //Se verifica si ya hay una cita registrada en la misma fecha y hora
      const citaRepetida = await this.repositoryCita.createQueryBuilder("citas")
      .where("citas.fecha = :fecha AND citas.hora = :hora", { 
        fecha: fechaStr,
        hora: cita.hora 
      })
      .getOne()
    
      if(citaRepetida){
        return false;
      }else{
        //Si no hay citas, se crea la nueva cita.
        let nuevacita = new CitaAltaDto(cita.email_cliente, cita.dni_empleado, cita.id_mascota, cita.fecha, cita.hora);
        const nuevaCita = this.repositoryCita.create(nuevacita);
        await this.repositoryCita.save(nuevaCita);
        return true;
      }
    }
  async highQuoteByEmployee(cita:CitaAltaEmpleadoDto):Promise<boolean>{

    const fechaStr = cita.fecha instanceof Date
    ? cita.fecha.toISOString().slice(0, 10)
    : cita.fecha;
    const citaRepetida = await this.repositoryCita.createQueryBuilder("citas")
    .where("citas.fecha = :fecha AND citas.hora = :hora", { 
      fecha: fechaStr,
      hora: cita.hora 
    })
    .getOne()    
    if(citaRepetida){
      return false;
    }
    // Verifica si el cliente existe, si no, lo crea
    let clienteRepetido:any = await this.clienteService.findClienteByEmail(cita.email_cliente);
    if (clienteRepetido instanceof ClienteDatosDto) {
      let clienteNuevo = new ClienteAltaDto(cita.email_cliente, cita.telefono_cliente, cita.nombre_cliente);   
      await this.clienteService.highClient(clienteNuevo)
    }
    //VERIFICACION MASCOTA
    let mascota = await this.mascotasService.findMascotaByEmailAndName(cita.email_cliente, cita.nombre_mascota);
    if(!mascota){
      let mascotanueva = new MascotaAltaDto(cita.email_cliente, cita.nombre_mascota, cita.raza, cita.edad);
      let mascotaNueva = await this.mascotasService.highAnimals(mascotanueva);
      if(mascotaNueva instanceof Mascota){
        let nuevacita = new CitaAltaDto(cita.email_cliente, cita.dni_empleado, mascotaNueva.id_mascota, cita.fecha, cita.hora);
        const nuevaCita = this.repositoryCita.create(nuevacita)
        await this.repositoryCita.save(nuevaCita);
        return true;  
      }
    }  
  }

  // Modificar Cita

  async modifyQuote(cita:CitaAltaDto):Promise<boolean>{
    const result = await this.repositoryCita.createQueryBuilder()
      .update(Cita)
      .set({ ...cita })
      .where("fecha = :fecha AND hora = :hora", { fecha: cita.fecha, hora: cita.hora })
      .execute();

    return result.affected && result.affected > 0;
  }

  // Eliminar Cita

  async deleteQuote(cita:CitaAltaDto):Promise<boolean>{
    const delet :Cita = await this.repositoryCita.createQueryBuilder("citas")
    .where("fecha=:fecha AND hora=:hora", { fecha: cita.fecha, hora: cita.hora })
    .getOne();
    
    if(delet){
      this.repositoryCita.delete(delet);
      return true;
    }else{
      return false;
    }
  }

}
