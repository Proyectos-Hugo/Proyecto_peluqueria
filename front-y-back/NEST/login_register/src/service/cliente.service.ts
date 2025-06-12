import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteAltaDto } from 'src/dto/ClienteAltaDto';
import { Cliente } from 'src/model/Cliente';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  
  constructor(
    @InjectRepository(Cliente) private repositoryCliente: Repository<Cliente>
  ){}
  
  // ALTA CLIENTE

  async highClient(nuevo:ClienteAltaDto):Promise<void>{

    // Verifica si el cliente existe, si no, lo crea
      let clienteRepetido :Cliente = await this.repositoryCliente.findOne({ where: { email: nuevo.email } });
      if (!clienteRepetido) { //Verifica si existe un cliente
        const cliente = this.repositoryCliente.create(
          nuevo
        );
        await this.repositoryCliente.save(cliente);
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
