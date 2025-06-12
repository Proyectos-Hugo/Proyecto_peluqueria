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

  async highClient(nuevo:ClienteAltaDto):Promise<boolean>{

    // Verifica si el cliente existe, si no, lo crea
      let clienteRepetido :Cliente = await this.repositoryCliente.findOne({ where: { email: nuevo.email } });
      if (!clienteRepetido) { //Verifica si existe un cliente
        const cliente = this.repositoryCliente.create(
          nuevo
        );
        await this.repositoryCliente.save(cliente);
        return true
      }
      else{
        return false
      }

  }

  //BAJA CLIENTE

  async deleteClient(email:string):Promise<boolean>{
    const cliente :Cliente = await this.repositoryCliente.createQueryBuilder("cliente")
    .where("email=:email", { email:email})
    .getOne();
    
    if(cliente){
      this.repositoryCliente.delete(cliente);
      return true;
    }else{
      return false;
    }
  }
  
  //MODIFICAR CLIENTE

  async modifyClient(email:string, clienteModificado :ClienteAltaDto):Promise<boolean>{
      const result = await this.repositoryCliente.createQueryBuilder()
      .update(Cliente)
      .set({ ...clienteModificado })
      .where("", { 
        password: clienteModificado.password, 
        telefono: clienteModificado.telefono 
      })
      .execute();

      return result.affected && result.affected > 0;
    }


    //BUSCAR CLIENTE POR EMAIL Y PASSWORD
    async findOne(email: string, password: string): Promise<Cliente | Error> {
      const usuario = await this.repositoryCliente.findOneBy({ email, password });
      if (usuario) {
        return usuario;
      }
    return new Error('Cuenta no encontrada');
  }
}
