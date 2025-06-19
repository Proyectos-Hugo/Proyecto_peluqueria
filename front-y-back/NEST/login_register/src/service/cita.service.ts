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
    const clienteNombre = typeof cliente === 'object' && cliente !== null
      ? cliente.nombre
      : '';
    const empleadoObj = await this.empleadosService.findEmpleadoByDni(cita.dni_empleado);
    const empleadoNombre = typeof empleadoObj === 'object' && empleadoObj !== null
      ? empleadoObj.nombre
      : '';
    const telefonoCliente = typeof cliente === 'object' && cliente !== null
      ? cliente.telefono
      : '';
    const mascota = await this.mascotasService.findMascota(cita.id_mascota);
    citasDto.push(
      new CitaDatosDto(
        cita,
        clienteNombre, // Now always a string
        telefonoCliente,
        empleadoNombre, // Now always a string
        mascota?.nombre ?? '',
        mascota?.raza ?? ''
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
          cita.email_cliente,
          cita.cliente?.telefono ?? '',
          cita.empleado?.dni ?? '',
          cita.mascota?.nombre ?? '',
          cita.mascota?.raza ?? ''
        )
      );
    }
    return [];
  }

  // Alta de una cita
    async highQuoteByClient(cita:CitaAltaClienteDto):Promise< CitaDatosDto | boolean>{

      const fechaStr = cita.fecha instanceof Date
      ? cita.fecha.toISOString().slice(0, 10)
      : cita.fecha;
      let mascota = await this.mascotasService.findMascota(cita.id_mascota);
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
        const citaCreada = await this.repositoryCita.save(nuevaCita);
        return new CitaDatosDto(
          nuevaCita,
          cita.nombre_cliente,
          cita.telefono_cliente,
          cita.dni_empleado,
          mascota.nombre,
          mascota.raza
        )
      } 
}
async highQuoteByEmployee(cita: CitaAltaEmpleadoDto): Promise<CitaDatosDto | boolean> {
  try {
    console.log('Datos recibidos:', cita);

    // Formatea la fecha para comparación (solo yyyy-mm-dd)
    const fechaStr = cita.fecha instanceof Date
      ? cita.fecha.toISOString().slice(0, 10)
      : cita.fecha;

    const citaRepetida = await this.repositoryCita.createQueryBuilder("citas")
      .where("citas.fecha = :fecha AND citas.hora = :hora", {
        fecha: fechaStr,
        hora: cita.hora
      })
      .getOne();

    if (citaRepetida) {
      console.warn('Ya existe una cita para esa fecha y hora');
      return false;
    }

    // Verifica si el cliente existe; si no, lo crea
    let cliente = await this.clienteService.findClienteByEmail(cita.email_cliente);
    console.log(cliente)
    if (!cliente) {
      const clienteNuevo = new ClienteAltaDto(
        cita.email_cliente,
        cita.nombre_cliente,
        cita.apellido_cliente,
        cita.telefono_cliente 
      );
      cliente = await this.clienteService.highClient(clienteNuevo);
      console.log('Cliente creado:', cliente);
    }

    // Verifica si la mascota existe
    let mascota = await this.mascotasService.findMascotaByEmailAndName(
      cita.email_cliente,
      cita.nombre_mascota
    );

    // Si la mascota no existe, la crea
    if (!mascota) {
      const mascotaNuevaDto = new MascotaAltaDto(
        cita.email_cliente,
        cita.nombre_mascota,
        cita.raza,
        cita.edad
      );
      mascota = await this.mascotasService.highAnimals(mascotaNuevaDto);
      console.log('Mascota creada:', mascota);
    }


    // Si la mascota fue creada o ya existía, se crea la cita
    if (mascota && typeof mascota === 'object' && 'id_mascota' in mascota ) {
      console.log('Creando cita...')
      const nuevaCitaDto = new CitaAltaDto(
        cita.email_cliente,
        cita.dni_empleado,
        mascota.id_mascota,
        cita.fecha,
        cita.hora
      );
      console.log('Datos de la nueva cita:', nuevaCitaDto);
      const nuevaCita = this.repositoryCita.create(nuevaCitaDto);
      const citaCreada = await this.repositoryCita.save(nuevaCita);
      return new CitaDatosDto(
        citaCreada,
        cita.nombre_cliente,
        cita.telefono_cliente,
        cita.dni_empleado,
        mascota.nombre,
        mascota.raza
        );
    }

    return false;

  } catch (error) {
    console.error('Error en highQuoteByEmployee:', error);
    return false;
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

  async deleteQuote(id:number):Promise<boolean>{
    const delet :Cita = await this.repositoryCita.createQueryBuilder("citas")
    .where("id_cita=:id", { id:id })
    .getOne();

    if(delet){
      this.repositoryCita.delete(delet);
      return true;
    }else{
      return false;
    }
  }

}
