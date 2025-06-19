import { Component, Input } from '@angular/core';
import { MascotaDatosDto } from '../../../../../model/MascotaDatosDto';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css'],
  imports: [CommonModule]
})
export class MascotaComponent {
  @Input() mascota!: MascotaDatosDto;
}
