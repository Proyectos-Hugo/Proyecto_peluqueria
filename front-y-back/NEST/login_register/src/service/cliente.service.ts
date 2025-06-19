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
        let cliente = this.repositoryCliente.create(nuevo);
        cliente = await this.repositoryCliente.save(cliente);
        return new ClienteDatosDto(cliente.email, cliente.nombre, cliente.apellido, cliente.telefono);
      }
      else{
        console.log('Cliente existente: ', clienteRepetido);
        if(!clienteRepetido.password && nuevo.password){
          // Si el cliente ya existe, verifica si tiene contraseña, y si no tiene, la añade
          return this.modifyClient(nuevo.email, nuevo);
        }
        else{
          return false;
        }
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

    async modifyClient(email:string, clienteModificado :ClienteAltaDto):Promise<ClienteDatosDto | boolean> {
      //otra alternativa
      const result = await this.repositoryCliente.update({ email: email }, { ...clienteModificado });
      //devolver el cliente actualizado
      if(result.affected > 0) {
        const usuario = await this.repositoryCliente.findOneBy({ email });  
        console.log('Cliente modificado: ', usuario);
        return new ClienteDatosDto(usuario.email, usuario.nombre, usuario.apellido, usuario.telefono, usuario.password);
      }

    }


    //BUSCAR CLIENTE POR EMAIL Y PASSWORD
    async findOne(email: string, password: string): Promise<ClienteDatosDto | boolean> {
      const usuario = await this.repositoryCliente.findOneBy({ email, password });
      if (usuario) {
        return new ClienteDatosDto(usuario.email, usuario.nombre, usuario.apellido, usuario.password, usuario.telefono);
      }
      return false;
    }

    async allClientes(): Promise<Cliente[]> {
      return this.repositoryCliente.find();
    }

    async findClienteByEmail(email: string): Promise<ClienteDatosDto | boolean> {
      const usuario = await this.repositoryCliente.findOneBy({ email });
      if (usuario)
        return new ClienteDatosDto(usuario.email, usuario.nombre, usuario.apellido, usuario.telefono, usuario.password);
      return false;
    }

}
