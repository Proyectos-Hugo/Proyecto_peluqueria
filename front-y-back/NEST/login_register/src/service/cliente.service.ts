import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteAltaDto } from 'src/dto/ClienteAltaDto';
import { ClienteDatosDto } from 'src/dto/ClienteDatosDto';
import { Cliente } from 'src/model/Cliente';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  
  constructor(
    @InjectRepository(Cliente) private repositoryCliente: Repository<Cliente>
  ){}
  
  // ALTA CLIENTE

  async highClient(nuevo:ClienteAltaDto):Promise<ClienteDatosDto | boolean>{

    // Verifica si el cliente existe, si no, lo crea
      let clienteRepetido :Cliente = await this.repositoryCliente.findOne({ where: { email: nuevo.email } });
      if (!clienteRepetido) { //Verifica si existe un cliente
        let cliente = this.repositoryCliente.create(
          nuevo
        );
        cliente =await this.repositoryCliente.save(cliente);
        return new ClienteDatosDto(cliente.email, cliente.nombre, cliente.apellido, cliente.apellido, cliente.telefono);
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
        email: email
      })
      .execute();

      return result.affected && result.affected > 0;
    }


    //BUSCAR CLIENTE POR EMAIL Y PASSWORD
    async findOne(email: string, password: string): Promise<ClienteDatosDto | Error> {
      const usuario = await this.repositoryCliente.findOneBy({ email, password });
      if (usuario) {
        return new ClienteDatosDto(usuario.email, usuario.nombre, usuario.apellido, usuario.password, usuario.telefono);
      }
      return new Error('Cuenta no encontrada');
    }

    async allClientes(): Promise<Cliente[]> {
      return this.repositoryCliente.find();
    }

    async findClienteByEmail(email: string): Promise<Cliente> {
      return this.repositoryCliente.findOneBy({ email });
    }

}
