import { CitaAltaDto } from './../dto/CitaAltaDto';
import { Cita } from './../model/Cita';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitaDatosDto } from 'src/dto/CitaDatosDto';
import { Cliente } from 'src/model/Cliente';
import { Repository } from 'typeorm';


@Injectable()
export class CitaService {
  
  constructor(
    @InjectRepository(Cita) private repositoryCita:Repository<Cita>,
    @InjectRepository(Cliente) private repositoryCliente: Repository<Cliente>, 
  ){}

  // Devolucion de todas las citas
  async findAllCitas(): Promise<CitaDatosDto[]> {
    const citas = await this.repositoryCita.find();
    const citasDto: CitaDatosDto[] = [];

    for (const cita of citas) {
      const cliente = await this.repositoryCliente.findOne({ where: { email: cita.email_cliente } });
      citasDto.push(
        new CitaDatosDto(
          cita,
          cliente?.nombre ?? '',
          cliente?.telefono ?? ''
        )
      );
    }

    return citasDto;
  }

  // Devover las citas de un cliente
  async findQuotesByClient(email: string):Promise<CitaDatosDto[]>{
    const result = await this.repositoryCita.createQueryBuilder('cita')
    .where('email_cliente = :email', { email })
    .getMany();
    if(result){
      const cliente = await this.repositoryCliente.findOne({ where: { email: email } });
       return result.map(cita => {    
        return new CitaDatosDto(cita, cliente?.nombre ?? '', cliente?.telefono ?? '');
       });
    }
  }

  // Alta de una cita
  async highQuote(cita:CitaAltaDto):Promise<boolean>{
    const fechaStr = cita.fecha instanceof Date
    ? cita.fecha.toISOString().slice(0, 10)
    : cita.fecha;
        // Verifica si el cliente existe, si no, lo crea
    let cliente :Cliente = await this.repositoryCliente.findOne({ where: { email: cita.email_cliente } });
    if (!cliente) {
      cliente = this.repositoryCliente.create({
        email: cita.email_cliente,
        nombre: cita.nombre_cliente,
        telefono: cita.telefono_cliente
      });
      await this.repositoryCliente.save(cliente);
    }
    const existe = await this.repositoryCita.createQueryBuilder("citas")
    .where("citas.fecha = :fecha AND citas.hora = :hora", { 
      fecha: fechaStr,
      hora: cita.hora 
    })
    .getOne()
   
    if(existe){
      console.log('repetido')
      return false;
    }else{
      const nuevaCita = this.repositoryCita.create(cita);
      await this.repositoryCita.save(nuevaCita);
      return true;
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
