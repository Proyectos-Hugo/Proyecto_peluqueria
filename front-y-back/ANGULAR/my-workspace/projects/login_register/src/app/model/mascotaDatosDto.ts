export class MascotaDatosDto {
  id_mascota:number;
  email_cliente:string;
  nombre:string;
  raza:string;
  edad:number;

  constructor(idMas?:number,emailClie?:string,nom?:string,raz?:string,age?:number){
    this.id_mascota=idMas;
    this.email_cliente=emailClie;
    this.nombre=nom;
    this.raza=raz;
    this.edad=age;
  }
}
