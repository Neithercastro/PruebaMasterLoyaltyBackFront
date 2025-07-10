import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HistorialComponent } from './historial/historial.component';

export const clienteRoutes: Routes = [
  { path: 'cliente/home', component: HomeComponent },
  { path: 'cliente/carrito', component: CarritoComponent },
  { path: 'cliente/historial', component: HistorialComponent }
];