import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/model/Cliente';
import { Repository } from 'typeorm';

@Injectable()
export class ClineteService {
  
  constructor(
    @InjectRepository(Cliente) private repositoryCliente: Repository<Cliente>
  ){}
  
  // ALTA CLIENTE

  async highClient(email:string):Promise<boolean>{

    // Verifica si el cliente existe, si no, lo crea
    let client:Cliente;
    if(client.email===email){
      let cliente :Cliente = await this.repositoryCliente.findOne({ where: { email: client.email } });
      if (!cliente) {
        cliente = this.repositoryCliente.create({
          email: client.email,
          nombre: client.nombre,
          apellido: client.apellido,
          mascotas: client.mascotas,
          telefono: client.telefono
        });
        await this.repositoryCliente.save(cliente);
      }
      const existe = await this.repositoryCliente.createQueryBuilder("cliente")
        .where("cliente.email=:email", { email:client.email })
        .getOne()
        
      if(existe){
        return false;
      }else{
        const nuevoCliente = this.repositoryCliente.create(cliente);
        await this.repositoryCliente.save(nuevoCliente);
        return true;
      }
    }
  }

  //BAJA CLIENTE

  async deleteClient(email:string):Promise<boolean>{
    const delet :Cliente = await this.repositoryCliente.createQueryBuilder("cliente")
    .where("email=:email", { email:email})
    .getOne();
    
    if(delet){
      this.repositoryCliente.delete(delet);
      return true;
    }else{
      return false;
    }
  }
  
  //MODIFICAR CLIENTE

  async modifyClient(email:string):Promise<boolean>{
    let client:Cliente;
    if(client.email===email){
      const result = await this.repositoryCliente.createQueryBuilder()
      .update(Cliente)
      .set({ ...client })
      .where("", { password:client.password, telefono:client.telefono })
      .execute();

      return result.affected && result.affected > 0;
    }
  }
}
