export class CitaAltaDto{
    email_cliente:string;
    dni_empleado:string;
    id_mascota:number;
    fecha:Date;
    hora:string;

    constructor(email:string, dni_empleado:string, id_mas:number, fecha:Date, hora:string){
        this.email_cliente=email;
        this.dni_empleado=dni_empleado;
        this.id_mascota=id_mas;
        this.fecha=fecha;
        this.hora=hora;
    }
}