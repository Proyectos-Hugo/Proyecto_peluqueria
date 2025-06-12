import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MascotaAltaDto } from 'src/dto/MascotaAltaDto';
import { Mascota } from 'src/model/Mascota';
import { Repository } from 'typeorm';

@Injectable()
export class MascotaService {

  constructor(
      @InjectRepository(Mascota) private repositoryMascota: Repository<Mascota>,
  ){}

  //ALTA MASCOTA

  async highAnimals(animal:MascotaAltaDto):Promise<boolean>{

    // Verifica si la mascota existe, si no, lo crea
    let mascota:Mascota = await this.repositoryMascota.findOne({ where: { email_cliente: animal.email_cliente, nombre: animal.nombre, raza: animal.raza}});
    if (!mascota) {
      mascota = this.repositoryMascota.create({
        email_cliente: animal.email_cliente,
        nombre: animal.nombre,
        raza: animal.raza,
        edad: animal.edad
      });
      await this.repositoryMascota.save(mascota);
    }

    const existe = await this.repositoryMascota.createQueryBuilder("mascota")
    .where("mascota.id_mascota=:id_mascota", { id_mascota:animal.id_mascota })
    .getOne()
    
    if(existe){
      console.log('repetido')
      return false;
    }else{
      const nuevoMascota = this.repositoryMascota.create(animal);
      await this.repositoryMascota.save(nuevoMascota);
      return true;
    }
  }

  //BAJA MASCOTA

  async deleteAnimal(mascota:MascotaAltaDto):Promise<boolean>{
    const delet :Mascota = await this.repositoryMascota.createQueryBuilder("mascota")
    .where("id_mascota=:id_mascota", { id_mascota:mascota.id_mascota})
    .getOne();
    
    if(delet){
      this.repositoryMascota.delete(delet);
      return true;
    }else{
      return false;
    }
  }

  //MODIFICAR MASCOTA

  async modifyAnimals(mascota:MascotaAltaDto):Promise<boolean>{
    const result = await this.repositoryMascota.createQueryBuilder()
      .update(Mascota)
      .set({ ...mascota })
      .where("nombre = :nombre AND raza = :raza AND edad=: edad", { nombre:mascota.nombre, raza:mascota.raza, edad:mascota.edad })
      .execute();

    return result.affected && result.affected > 0;
  }
}
