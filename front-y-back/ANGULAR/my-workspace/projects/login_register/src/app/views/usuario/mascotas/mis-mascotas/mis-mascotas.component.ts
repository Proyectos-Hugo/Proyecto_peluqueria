import { Component } from '@angular/core';
import { MascotaService } from '../../../../service/mascota.service';
import { MascotaDatosDto } from '../../../../model/MascotaDatosDto';
import { MascotaAltaDto } from '../../../../model/MascotaAltaDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../service/user.service';
import { MascotaComponent } from "./mascota/mascota.component";
import { ClienteService } from '../../../../service/cliente.service';

@Component({
  selector: 'app-mis-mascotas',
  templateUrl: './mis-mascotas.component.html',
  styleUrls: ['./mis-mascotas.component.css'],
  imports: [CommonModule, FormsModule, MascotaComponent],
})
export class MisMascotasComponent {
  mascotas: MascotaDatosDto[] = [];
  mensaje: string = '';
  editandoId: number | null = null;
  mascotaEditada: MascotaAltaDto = new MascotaAltaDto('', '', '', 0);

  constructor(private mascotaService: MascotaService, private clienteService: ClienteService) {}

  ngOnInit() {
    this.obtenerMascotasPorEmail();
  }

  obtenerMascotasPorEmail() {
    this.mascotaService.getMascotasPorEmail(this.clienteService.getCliente().email).subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
        this.mensaje = mascotas.length ? '' : 'No se encontraron mascotas para este email.';
      },
      error: () => {
        this.mascotas = [];
        this.mensaje = 'Error al buscar mascotas.';
      }
    });
  }

  eliminarMascota(id: number) {
    this.mascotaService.deleteMascota(id).subscribe({
      next: () => {
        this.mensaje = 'Mascota eliminada correctamente.';
        this.obtenerMascotasPorEmail();
      },
      error: () => {
        this.mensaje = 'Error al eliminar la mascota.';
      }
    });
  }

  editarMascota(mascota: MascotaDatosDto) {
    this.editandoId = mascota.id_mascota ?? null;
    this.mascotaEditada = new MascotaAltaDto(
      mascota.email_cliente,
      mascota.nombre,
      mascota.raza,
      mascota.edad
    );
  }

  guardarEdicion() {
    if (this.editandoId && this.mascotaEditada) {
      this.mascotaService.modifyMascota(this.editandoId, this.mascotaEditada).subscribe({
        next: () => {
          this.mensaje = 'Mascota editada correctamente.';
          this.editandoId = null;
          this.obtenerMascotasPorEmail();
        },
        error: () => {
          this.mensaje = 'Error al editar la mascota.';
        }
      });
    }
  }

  cancelarEdicion() {
    this.editandoId = null;
    this.mascotaEditada = new MascotaAltaDto('', '', '', 0);
  }
}
