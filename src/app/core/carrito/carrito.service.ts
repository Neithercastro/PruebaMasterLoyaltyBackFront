import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgregarProductoCarritoDTO } from '../../models/carrito/agregar-producto-carrito.model';
import { ActualizarCantidadCarritoDTO } from '../../models/carrito/actualizar-cantidad-producto-carrito.model';
import { EliminarProductoCarritoDTO } from '../../models/carrito/eliminar-producto-carrito.model';
import { CarritoDTO } from '../../models/carrito/carrito.model';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'https://localhost:7172/api/Carrito';

  constructor(private http: HttpClient) {}

  agregarProducto(data: AgregarProductoCarritoDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/Agregar`, data);
  }

  obtenerCarrito(idCliente: number): Observable<CarritoDTO> {
    return this.http.get<CarritoDTO>(`${this.apiUrl}/Obtener-Carrito-Cliente/${idCliente}`);
  }

  actualizarCantidad(dto: ActualizarCantidadCarritoDTO): Observable<any> {
  return this.http.put(`${this.apiUrl}/Actualizar-Cantidad`, dto);
}

eliminarProducto(dto: EliminarProductoCarritoDTO): Observable<any> {
  return this.http.request('delete', `${this.apiUrl}/Eliminar`, { body: dto });
}


  finalizarCompra(idCliente: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/finalizar-compra/${idCliente}`, null);
  }

}