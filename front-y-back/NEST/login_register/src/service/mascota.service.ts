import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MascotaAltaDto } from 'src/dto/MascotaAltaDto';
import { MascotaDatosDto } from 'src/dto/MascotaDatosDto';
import { Mascota } from 'src/model/Mascota';
import { Repository } from 'typeorm';

@Injectable()
export class MascotaService {

  constructor(
    @InjectRepository(Mascota) private repositoryMascota: Repository<Mascota>,
  ){}

  // BUSCAR MASCOTA

  async findMascotas(id: number): Promise<Mascota[]> {
    return this.repositoryMascota.find({ where: { id_mascota:id } });
  }

  //ALTA MASCOTA

  async highAnimals(mascota: MascotaAltaDto):Promise<boolean>{

    // Verifica si la mascota existe, si no, lo crea
      let mascotaRepetida:Mascota = await this.repositoryMascota.findOne({ where: { email_cliente: mascota.email_cliente, nombre: mascota.nombre, raza: mascota.raza}});
      if (!mascotaRepetida) {
        this.repositoryMascota.create(mascota);
        await this.repositoryMascota.save(mascota)
        return true;
      }
      else{
        return false;
      }

  } 

  //BAJA MASCOTA

  async deleteAnimal(id:number):Promise<boolean>{
    const mascota :Mascota = await this.repositoryMascota.createQueryBuilder("mascota")
    .where("id_mascota=:id", { id_mascota:id})
    .getOne();
    
    if(mascota){
      this.repositoryMascota.delete(mascota);
      return true;
    }else{
      return false;
    }
  }

  //MODIFICAR MASCOTA

  async modifyAnimals(id:number, mascota: MascotaAltaDto):Promise<boolean>{

      const result = await this.repositoryMascota.createQueryBuilder()
        .update(Mascota)
        .set({ ...mascota })
        .where("id_mascota = :id", { id_mascota:id })
        .execute()
      return result.affected && result.affected > 0;
    
  }

}
