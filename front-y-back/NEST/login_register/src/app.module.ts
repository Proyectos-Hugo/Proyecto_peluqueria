import { UserController } from './controller/user.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './model/Cita';
import { Cliente } from './model/Cliente';
import { Empleado } from './model/Empleado';
import { Mascota } from './model/Mascota';
import { Pedido } from './model/Pedido';
import { PedidoProducto } from './model/PedidoProducto';
import { Producto } from './model/Producto';
import { CitaController } from './controller/cita.controller';
import { TiendaController } from './controller/tienda.controller';
import { TiendaService } from './service/tienda.service';
import { CitaService } from './service/cita.service';
import { EmpleadoService } from './service/empleado.service';
import { ClienteService } from './service/cliente.service';
import { MascotaService } from './service/mascota.service';
import { LoginController } from './controller/login.controller';
import { MascotaController } from './controller/mascota.controller';
import { EmpleadoController } from './controller/empleado.controller';
import { Usuario } from './model/Usuario';
import { UserService } from './service/user.service';



@Module({
  imports: [TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'nestuser',
  password: 'nestpass',
  database: 'db_peluqueria',
  entities: [Usuario,Cita,Cliente,Empleado,Mascota,Pedido,PedidoProducto,Producto],
  synchronize: false,
  }),TypeOrmModule.forFeature([Usuario,Cita,Cliente,Empleado,Mascota,Pedido,PedidoProducto,Producto])],
  controllers: [UserController,LoginController,CitaController,TiendaController,MascotaController,EmpleadoController],
  providers: [UserService,TiendaService,CitaService,EmpleadoService,ClienteService,MascotaService],
})
export class AppModule {}
