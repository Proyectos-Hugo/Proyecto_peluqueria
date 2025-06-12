import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mascota } from 'src/model/Mascota';
import { Repository } from 'typeorm';

@Injectable()
export class MascotaService {

  constructor(
    @InjectRepository(Mascota) private repositoryMascota: Repository<Mascota>,
  ){}

  //ALTA MASCOTA

  async highAnimals(id:number):Promise<boolean>{

    // Verifica si la mascota existe, si no, lo crea
    
    let masc :Mascota;
    if(masc.id_mascota===id){
      let mascota:Mascota = await this.repositoryMascota.findOne({ where: { email_cliente: masc.email_cliente, nombre: masc.nombre, raza: masc.raza}});
      if (!mascota) {
        mascota = this.repositoryMascota.create({
          email_cliente: mascota.email_cliente,
          nombre: mascota.nombre,
          raza: mascota.raza,
          edad: mascota.edad
        });
        await this.repositoryMascota.save(mascota);
      }

      const existe = await this.repositoryMascota.createQueryBuilder("mascota")
      .where("mascota.id_mascota=:id_mascota", { id_mascota:id })
      .getOne()
      
      if(existe){
        return false;
      }else{
        const nuevoMascota = this.repositoryMascota.create(mascota);
        await this.repositoryMascota.save(nuevoMascota);
        return true;
      }
    } 
  }

  //BAJA MASCOTA

  async deleteAnimal(id:number):Promise<boolean>{
    const delet :Mascota = await this.repositoryMascota.createQueryBuilder("mascota")
    .where("id_mascota=:id_mascota", { id_mascota:id})
    .getOne();
    
    if(delet){
      this.repositoryMascota.delete(delet);
      return true;
    }else{
      return false;
    }
  }

  //MODIFICAR MASCOTA

  async modifyAnimals(id:number):Promise<boolean>{
    let mascota:Mascota;
    if(mascota.id_mascota===id){
      const result = await this.repositoryMascota.createQueryBuilder()
        .update(Mascota)
        .set({ ...mascota })
        .where("nombre = :nombre AND raza = :raza AND edad=: edad", { nombre:mascota.nombre, raza:mascota.raza, edad:mascota.edad })
        .execute();

      return result.affected && result.affected > 0;
    }
    
  }
}
