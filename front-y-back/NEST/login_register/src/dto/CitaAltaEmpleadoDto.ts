export class CitaAltaEmpleadoDto{
    email_cliente:string;
    nombre_cliente: string;
    apellido_cliente: string;
    telefono_cliente: string;
    dni_empleado:string;
    nombre_mascota:string;
    raza: string;
    edad: number;
    fecha:Date;
    hora:string;

    constructor(email:string, nombre_cliente: string, apellido_cliente: string, telefono_cliente: string, dni_empleado:string, nombre_mascota:string, raza: string, edad: number, fecha:Date, hora:string){
        this.email_cliente=email;
        this.nombre_cliente = nombre_cliente;
        this.apellido_cliente = apellido_cliente;
        this.telefono_cliente = telefono_cliente;
        this.dni_empleado=dni_empleado;
        this.nombre_mascota=nombre_mascota;
        this.raza=raza;
        this.edad=edad;
        this.fecha=fecha;
        this.hora=hora;
    }
}