export class EmpleadosDatosDto{
  dni:string;
  nombre:string;
  apellido:string;
  especialidad:string;
  telefono:number;

  constructor(dni?:string, nom?:string, apell?:string, espe?:string, tel?:number){
    this.dni=dni;
    this.nombre=nom;
    this.apellido=apell;
    this.especialidad=espe;
    this.telefono=tel;
  }
}
