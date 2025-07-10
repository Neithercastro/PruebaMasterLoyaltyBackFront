import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { clienteRoutes } from './features/cliente/cliente.routes';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/cliente/home/home.component';
import { CarritoComponent } from './features/cliente/carrito/carrito.component';
import { HistorialComponent } from './features/cliente/historial/historial.component';

export const routes: Routes = [
    {path: 'Login', component: LoginComponent},
    {path: 'Register', component: RegisterComponent},
    {path: 'Home', component: HomeComponent},
    {path: 'Carrito', component: CarritoComponent},
    {path: 'HistorialCliente', component: HistorialComponent},
    { path: '', redirectTo: '/Login', pathMatch: 'full' },
    {path: '**', redirectTo: '/Login' }

];
