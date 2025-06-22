import { MascotaService } from '../../service/mascota.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MascotaAltaDto } from '../../model/MascotaAltaDto';
import { MascotaDatosDto } from '../../model/MascotaDatosDto';

@Component({
  selector: 'app-mascota',
  imports: [FormsModule,CommonModule],
  templateUrl: './mascota.component.ts',
  styleUrl: '../../views/usuario/mascotas/mis-mascotas/mis-mascotas.component.css',
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
  mascotaEncontrada: MascotaDatosDto[];
  mensajeAlta: string;

  constructor(private mascotaService:MascotaService){}

  //MUESTRA LA MASCOTA POR ID
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

  //SE DA DE ALTA A LA MASCOTA
  altaMascota() {
    let nuevaMascota = new MascotaAltaDto(this.email_cliente, this.nombreMascota, this.razaMascota, this.edadMascota);
    this.mascotaService.altaMascota(nuevaMascota)
   .subscribe({
      next: mascota => {
      this.mensajeAlta = 'Mascota creada correctamente.';
      this.email_clienteMascota = '';
      this.nombreMascota = '';
      this.razaMascota = '';
      this.edadMascota;
    },
      error: err => {
        this.mensajeAlta = 'Error al crear la mascota.';
      }
    });
  }

  //SE DA DE BAJA A LA MASCOTA
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

  //SE MODIFICA A LA MASCOTA
  modificarMascota() {
    this.mascotaService.modifyMascota(
      this.idModificar,
      {
        email_cliente: this.email_clienteMascota,
        nombre: this.nombre,
        raza: this.raza,
        edad: this.edad
      }
    ).subscribe({
      next: (resultado) => {
        this.mensajeAlta = resultado ? 'Mascota modificada correctamente.' : 'No se pudo modificar la mascota.';
      },
      error: () => {
        this.mensajeAlta = 'Error al modificar la mascota.';
      }
    });
  }
}
