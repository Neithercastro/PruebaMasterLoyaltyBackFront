import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { clienteRoutes } from './features/cliente/cliente.routes';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/cliente/home/home.component';
import { CarritoComponent } from './features/cliente/carrito/carrito.component';
import { HistorialComponent } from './features/cliente/historial/historial.component';
import { AuthGuard } from './core/auth/auth.guard';
import { HometiendaComponent } from './features/tienda/hometienda/hometienda.component';
import { AgregarArticuloComponent } from './features/tienda/agregar-articulo/agregar-articulo.component';
import { EditarArticuloComponent } from './features/tienda/editar-articulo/editar-articulo.component';
import { VentasComponent } from './features/tienda/ventas/ventas.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { tipo: 'Cliente'}},
    {path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard], data: { tipo: 'Cliente'}},
    {path: 'historialCliente', component: HistorialComponent, canActivate: [AuthGuard], data: { tipo: 'Cliente'}},
    {path: 'tienda/home', component: HometiendaComponent, canActivate: [AuthGuard], data: { tipo: 'Tienda' }},
    {path: 'tienda/agregar', component: AgregarArticuloComponent, canActivate: [AuthGuard], data: { tipo: 'Tienda' }},
    {path: 'tienda/editar', component: EditarArticuloComponent, canActivate: [AuthGuard], data: { tipo: 'Tienda' }},
    {path: 'tienda/ventas', component: VentasComponent, canActivate: [AuthGuard], data: { tipo: 'Tienda' }},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: '**', redirectTo: '/login' }

];
