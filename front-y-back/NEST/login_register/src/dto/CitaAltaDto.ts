export class CitaAltaDto{
    email_cliente:string;
    nombre_cliente: string;
    telefono_cliente: string;
    dni_empleado:string;
    id_mascota:number;
    fecha:Date;
    hora:string;

    constructor(email?:string, nombre_cliente?: string, telefono_cliente?: string, dni?:string, id_mas?:number, fecha?:Date, hora?:string){
        this.email_cliente=email;
        this.nombre_cliente = nombre_cliente;
        this.telefono_cliente = telefono_cliente;
        this.dni_empleado=dni;
        this.id_mascota=id_mas;
        this.fecha=fecha;
        this.hora=hora;
    }
}