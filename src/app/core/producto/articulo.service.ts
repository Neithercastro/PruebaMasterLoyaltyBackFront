import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginacionResponse } from '../../models/productos/paginacion-response.model';
import { ArticuloDTO } from '../../models/productos/articulo.dto';
import { TiendaDTO } from '../../models/tienda/tienda.dto';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl = 'https://localhost:7172/api/Articulo';

  constructor(private http: HttpClient) {}

  //********* SERVICIOS PARA TIENDAS ************* */

  agregarArticulo(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/AltaArticulo`, formData);
  }

  obtenerArticulosPorTienda(idTienda: number, pagina: number): Observable<PaginacionResponse<ArticuloDTO>> {
  return this.http.get<PaginacionResponse<ArticuloDTO>>(`https://localhost:7172/api/Articulo/Admin/Tienda/${idTienda}?pagina=${pagina}`);
  }


  editarArticulo(data: FormData): Observable<any> {
  return this.http.post(`https://localhost:7172/api/Articulo/EditarArticulo`, data);
  }

  //********* SERVICIOS PARA CLIENTES ************* */

  // Obtener todas las tiendas
listarTiendas(pagina: number = 1): Observable<PaginacionResponse<TiendaDTO>> {
    const params = new HttpParams().set('pagina', pagina.toString());
    return this.http.get<PaginacionResponse<TiendaDTO>>(`https://localhost:7172/api/Tienda/Listar`, { params });
  }


// Obtener productos paginados por tienda (o todos si idTienda = null)
 buscarTodos(pagina: number = 1): Observable<PaginacionResponse<ArticuloDTO>> {
    const params = new HttpParams().set('pagina', pagina.toString());
    return this.http.get<PaginacionResponse<ArticuloDTO>>(`https://localhost:7172/api/Articulo/BuscarTodos`, { params });
  }

  //Obtener Productos Por una tienda en especifica
  buscarPorTienda(idTienda: number, pagina: number = 1): Observable<PaginacionResponse<ArticuloDTO>> {
  const url = `https://localhost:7172/api/Articulo/Cliente/BuscarPorTienda/${idTienda}`;
  const params = new HttpParams().set('pagina', pagina.toString());
  return this.http.get<PaginacionResponse<ArticuloDTO>>(url, { params });
}



}
