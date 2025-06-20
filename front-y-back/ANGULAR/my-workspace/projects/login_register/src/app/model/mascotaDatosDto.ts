
export class MascotaDatosDto {
  id_mascota?: number;
  nombre: string;
  raza: string;
  edad: number;
  email_cliente: string;

  constructor(id_mascota: number, email_cliente: string, nombre: string, raza: string, edad: number) {
    this.id_mascota = id_mascota;
    this.email_cliente = email_cliente;
    this.nombre = nombre;
    this.raza = raza;
    this.edad = edad;
  }
}
