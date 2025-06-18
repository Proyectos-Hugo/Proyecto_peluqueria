
export class MascotaAltaDto {
  email_cliente: string;
  nombre: string;
  raza: string;
  edad: number;


  constructor(email_cliente: string, nombre: string, raza: string, edad?: number) {
    this.email_cliente = email_cliente;
    this.nombre = nombre;
    this.raza = raza;
    this.edad = edad;

  }
}
