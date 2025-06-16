import { MascotaService } from '../../service/mascota.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MascotaDatosDto } from '../../model/mascotaDatosDto';

@Component({
  selector: 'app-mascota',
  imports: [FormsModule,CommonModule],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css'
})
export class MascotaComponent {

  email:string;
  bajaId:number;
  idModificar:number;
  nuevaMascota:MascotaDatosDto;
  modificarMascotaData:MascotaDatosDto;

  constructor(private mascotaService:MascotaService){}

  buscarMascotaPorId(){
    return this.mascotaService.findMascota(this.email);
  }

  altaMascota(){
    return this.mascotaService.altaMascota(
      this.nuevaMascota.email_cliente,
      this.nuevaMascota.nombre,
      this.nuevaMascota.raza,
      this.nuevaMascota.edad
    );
  }

  bajaMascota(){
    return this.mascotaService.deleteMascota(this.bajaId);
  }

  modificarMascota(){
    return this.mascotaService.modifyMAscota(
      this.idModificar,
      this.modificarMascotaData
    );
  }
}
