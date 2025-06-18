
import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AuthComponent } from './views/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NuevaMascotaComponent } from './views/usuario/mascotas/nueva-mascota/nueva-mascota.component';
import { MisMascotasComponent } from './views/usuario/mascotas/mis-mascotas/mis-mascotas.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';

export const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'nueva-mascota',
    component: NuevaMascotaComponent
  },
  {
    path: 'mis-mascotas',
    component: MascotaComponent
  },
  {
    path: 'mis-empleados',
    component: EmpleadoComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
