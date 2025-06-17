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

  id_mascota:number;
  bajaId:number;
  idModificar:number;
  email_cliente:string;
  nombreMascota: string;
  razaMascota: string;
  edadMascota: number;
  email_clienteMascota: string;
  nombre: string;
  raza: string;
  edad: number;
  mascotaEncontrada:MascotaDatosDto;


  constructor(private mascotaService:MascotaService){}

  buscarMascotaPorId() {
    this.mascotaService.findMascota(this.id_mascota)
    .subscribe(mascota => {this.mascotaEncontrada = mascota});
    return this.mascotaEncontrada;
  }

  altaMascota(){
    return this.mascotaService.altaMascota(
      this.email_cliente,
      this.nombreMascota,
      this.razaMascota,
      this.edadMascota
    );
  }

  bajaMascota(){
    return this.mascotaService.deleteMascota(this.bajaId);
  }

  modificarMascota(){
    return this.mascotaService.modifyMascota(
      this.idModificar,
      {
        email_cliente: this.email_clienteMascota,
        nombre: this.nombre,
        raza: this.raza,
        edad: this.edad
      }
    );
  }
}
