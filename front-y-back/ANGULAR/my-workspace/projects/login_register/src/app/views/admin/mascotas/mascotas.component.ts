import { MascotaService } from '../../../service/mascota.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MascotaDatosDto } from '../../../model/MascotaDatosDto';
import { MascotaAltaDto } from '../../../model/MascotaAltaDto';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-mascota',
  imports: [FormsModule,CommonModule],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent {

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
  mascotaEncontrada: MascotaDatosDto[];
  mensajeAlta: string;
  mascota = {
    id_mascota: null,
    nombre: '',
    raza: '',
    edad: null,
    email_cliente: ''
  };

  constructor(private mascotaService:MascotaService, private userService: UserService){}

  buscarMascotaPorId() {
  this.mascotaService.findMascota(this.id_mascota).subscribe(mascota => {
    if (Array.isArray(mascota)) {
      this.mascotaEncontrada = mascota;
    } else if (mascota) {
      this.mascotaEncontrada = [mascota];
    } else {
      this.mascotaEncontrada = [];
    }
  });
}

  altaMascota() {
    let nuevaMascota = new MascotaAltaDto(this.email_cliente, this.nombreMascota, this.razaMascota, this.edadMascota);
    this.mascotaService.altaMascota(nuevaMascota)
   .subscribe({
      next: mascota => {
      this.mensajeAlta = 'Mascota creada correctamente.';
      this.email_clienteMascota = '';
      this.nombreMascota = '';
      this.razaMascota = '';
      this.edadMascota = null;
    },
      error: err => {
        this.mensajeAlta = 'Error al crear la mascota.';
      }
    });
  }

  bajaMascota() {
    this.mascotaService.deleteMascota(this.bajaId).subscribe({
      next: (resultado) => {
        this.mensajeAlta = resultado ? 'Mascota eliminada correctamente.' : 'No se pudo eliminar la mascota.';
      },
      error: () => {
        this.mensajeAlta = 'Error al eliminar la mascota.';
      }
    });
  }

  modificarMascota() {
    console.log(this.idModificar)
    this.mascotaService.modifyMascota(
      this.idModificar,
      new MascotaAltaDto(this.mascota.email_cliente, this.mascota.nombre, this.mascota.raza, this.mascota.edad)
    ).subscribe({
      next: (resultado) => {
        console.log(resultado);
        this.mensajeAlta = resultado ? 'Mascota modificada correctamente.' : 'No se pudo modificar la mascota.';
      },
      error: () => {
        this.mensajeAlta = 'Error al modificar la mascota.';
      }
    });
  }
}
